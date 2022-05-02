import { v4 as uuidv4 } from 'uuid';
import { Socket, io } from 'socket.io-client';
import {
  BCMSClientSecurity,
  BCMSClientSocketEventCallback,
  BCMSClientSocketEventName,
  BCMSClientSocketHandler,
  BCMSSocketEvent,
  BCMSSocketEventName,
} from '../types';
import { clearInterval } from 'timers';

export function createBcmsClientSocketHandler({
  cmsOrigin,
  security,
}: {
  cmsOrigin: string;
  security: BCMSClientSecurity;
}): BCMSClientSocketHandler {
  const subs: {
    [eventName: string]: {
      [id: string]: BCMSClientSocketEventCallback;
    };
  } = {};
  const eventNames = Object.keys(BCMSSocketEventName);
  let isConnected = false;
  let socket: Socket | null = null;
  let checkConnectionInterval: NodeJS.Timeout;
  let shouldBeConnected = false;

  eventNames.forEach((eventName) => {
    subs[eventName] = {};
  });
  subs.ANY = {};
  subs.RECONNECT = {};

  function triggerSubs(
    eventName: BCMSClientSocketEventName,
    event: BCMSSocketEvent,
  ) {
    for (const id in subs[eventName]) {
      subs[eventName][id]({ eventName, data: event }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`Subs.${eventName}.${id} ->`, error);
      });
    }
    if (eventName !== 'ANY') {
      for (const id in subs.ANY) {
        subs.ANY[id]({ eventName, data: event }).catch((error) => {
          // eslint-disable-next-line no-console
          console.error(`Subs.${eventName}.${id} ->`, error);
        });
      }
    }
  }
  function initSocket(soc: Socket) {
    for (const eventName in subs) {
      soc.on(eventName, (data) => {
        triggerSubs(eventName, data);
      });
    }
  }
  async function reconnect() {
    if (shouldBeConnected && !isConnected) {
      await self.connect();

      if (isConnected) {
        triggerSubs('RECONNECT', undefined as never);
      }
    }
  }

  const self: BCMSClientSocketHandler = {
    id() {
      if (socket) {
        return socket.id;
      }
      return null;
    },
    emit(event, data) {
      if (socket) {
        socket.emit(event, data);
      }
    },
    async connect() {
      if (!checkConnectionInterval) {
        checkConnectionInterval = setInterval(reconnect, 5000);
      }
      if (!isConnected) {
        isConnected = true;
        return await new Promise((resolve, reject) => {
          const sign = security.sign({});
          try {
            socket = io(cmsOrigin, {
              path: '/api/socket/server',
              transports: ['websocket'],
              query: {
                key: sign.k,
                nonce: sign.n,
                timestamp: sign.t,
                signature: sign.s,
              },
              autoConnect: false,
            });
            socket.connect();
            socket.on('connect_error', (...data: unknown[]) => {
              if (socket) {
                socket.close();
              }
              isConnected = false;
              reject(data);
            });
            socket.on('error', (data) => {
              if (socket) {
                socket.close();
              }
              isConnected = false;
              reject(data);
            });
            socket.on('connect', () => {
              // eslint-disable-next-line no-console
              console.log('Successfully connected to Socket server.');
              isConnected = true;
              shouldBeConnected = true;
              initSocket(socket as Socket);
              resolve();
            });
            socket.on('disconnect', () => {
              isConnected = false;
              // eslint-disable-next-line no-console
              console.log('Disconnected from Socket server.');
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    },
    connected() {
      return false;
    },
    disconnect() {
      if (socket && isConnected) {
        socket.disconnect();
        isConnected = false;
      }
      if (checkConnectionInterval) {
        clearInterval(checkConnectionInterval);
      }
    },
    subscribe(eventName, callback) {
      const id = uuidv4();
      if (!subs[eventName]) {
        subs[eventName] = {};
        if (socket) {
          socket.on(eventName, (data) => {
            triggerSubs(eventName, data);
          });
        }
      }
      subs[eventName][id] = callback as BCMSClientSocketEventCallback<unknown>;
      return () => {
        delete subs[eventName][id];
      };
    },
  };

  return self;
}
