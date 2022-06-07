import {
  BCMSClientCacheManager,
  BCMSClientEntryHandler,
  BCMSClientSocketHandler,
  BCMSEntry,
  BCMSEntryParsed,
  BCMSSocketEntryEvent,
  BCMSSocketEventName,
  BCMSSocketEventType,
  GetKeyAccess,
  SendFunction,
} from '../types';

export function createBcmsClientEntryHandler({
  send,
  getKeyAccess,
  enableCache,
  cacheManager,
  socket,
}: {
  send: SendFunction;
  getKeyAccess: GetKeyAccess;
  enableCache?: boolean;
  cacheManager: BCMSClientCacheManager;
  socket: BCMSClientSocketHandler;
}): BCMSClientEntryHandler {
  if (enableCache) {
    socket.subscribe(BCMSSocketEventName.ENTRY, async (event) => {
      const data = event.data as BCMSSocketEntryEvent;
      if (data.t === BCMSSocketEventType.UPDATE) {
        if (cacheManager.entry.findOne((e) => e._id === data.e)) {
          await self.getRaw({
            entry: data.e,
            template: data.tm,
          });
        }
        if (cacheManager.entryParsed.findOne((e) => e._id === data.e)) {
          await self.get({
            entry: data.e,
            template: data.tm,
          });
        }
      } else {
        cacheManager.entry.remove(data.e);
        cacheManager.entryParsed.remove(data.e);
      }
    });
  }

  const getAllLatch: {
    r: {
      [tid: string]: string;
    };
    p: {
      [tid: string]: string;
    };
  } = {
    r: {},
    p: {},
  };

  const self: BCMSClientEntryHandler = {
    async getAll(data) {
      if (!data.skipCache && enableCache && getAllLatch.p[data.template]) {
        return cacheManager.entryParsed.find(
          (e) => e.templateId === getAllLatch.p[data.template],
        );
      }
      const keyAccess = await getKeyAccess();
      const access = keyAccess.templates.find(
        (e) => e._id === data.template || e.name === data.template,
      );
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ items: BCMSEntryParsed[] }>({
        url: `/entry/all/${data.template}/parse/${
          data.maxDepth ? data.maxDepth : 2
        }`,
        method: 'GET',
      });
      if (enableCache && result.items.length > 0) {
        getAllLatch.p[access._id] = access._id;
        getAllLatch.p[access.name] = access._id;
        cacheManager.entryParsed.set(result.items);
      }
      return result.items;
    },
    async getAllRaw(data) {
      if (!data.skipCache && enableCache && getAllLatch.r[data.template]) {
        return cacheManager.entry.find(
          (e) => e.templateId === getAllLatch.r[data.template],
        );
      }
      const keyAccess = await getKeyAccess();
      const access = keyAccess.templates.find(
        (e) => e._id === data.template || e.name === data.template,
      );
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ items: BCMSEntry[] }>({
        url: `/entry/all/${data.template}`,
        method: 'GET',
      });
      if (enableCache && result.items.length > 0) {
        getAllLatch.r[access._id] = access._id;
        getAllLatch.r[access.name] = access._id;
        cacheManager.entry.set(result.items);
      }
      return result.items;
    },
    async get(data) {
      if (!data.skipCache && enableCache) {
        const cacheHit = cacheManager.entryParsed.findOne(
          (e) => e._id === data.entry || e.meta.en.slug === data.entry,
        );
        if (cacheHit) {
          return cacheHit;
        }
      }
      const keyAccess = await getKeyAccess();
      const access = keyAccess.templates.find(
        (e) => e._id === data.template || e.name === data.template,
      );
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ item: BCMSEntryParsed }>({
        url: `/entry/${data.template}/${data.entry}/parse/${
          data.maxDepth ? data.maxDepth : 2
        }`,
        method: 'GET',
      });
      if (enableCache) {
        cacheManager.entryParsed.set(result.item);
      }
      return result.item;
    },
    async getRaw(data) {
      if (!data.skipCache && enableCache) {
        const cacheHit = cacheManager.entry.findOne(
          (e) =>
            e._id === data.entry ||
            (e.meta[0].props[1].data as string[])[0] === data.entry,
        );
        if (cacheHit) {
          return cacheHit;
        }
      }
      const keyAccess = await getKeyAccess();
      const access = keyAccess.templates.find(
        (e) => e._id === data.template || e.name === data.template,
      );
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ item: BCMSEntry }>({
        url: `/entry/${data.template}/${data.entry}`,
        method: 'GET',
      });
      if (enableCache) {
        cacheManager.entry.set(result.item);
      }
      return result.item;
    },
  };

  return self;
}
