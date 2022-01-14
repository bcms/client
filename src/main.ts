import Axios from 'axios';
import {
  createBcmsClientFunctionHandler,
  createBcmsClientTypeConverterHandler,
  createBcmsClientEntryHandler,
  createBcmsClientMediaHandler,
} from './handlers';
import type {
  BCMSApiKeyAccess,
  BCMSApiKeySignature,
  BCMSClient,
  BCMSClientConfig,
  GetKeyAccess,
  SendFunction,
} from './types';
import { createBcmsClientSecurity, errorWrapper } from './util';

export function createBcmsClient(config: BCMSClientConfig): BCMSClient {
  if (config.cmsOrigin.endsWith('/')) {
    config.cmsOrigin = config.cmsOrigin.substring(
      0,
      config.cmsOrigin.length - 1,
    );
  }
  let keyAccess: BCMSApiKeyAccess | undefined = undefined;
  const security = createBcmsClientSecurity({
    apiKeyId: config.key.id,
    apiKeySecret: config.key.secret,
  });

  const send: SendFunction = async (conf) => {
    if (conf.data && typeof conf.data === 'object') {
      if (conf.headers) {
        conf.headers['Content-Type'] = 'application/json';
      } else {
        conf.headers = {
          'Content-Type': 'application/json',
        };
      }
    }
    let signature: BCMSApiKeySignature | undefined = undefined;
    if (!conf.doNotUseAuth) {
      const signatureResult = await errorWrapper({
        exec: async () => {
          return security.sign(
            typeof conf.data === 'undefined' ? {} : conf.data,
          );
        },
        onSuccess: async (result) => {
          return result;
        },
      });
      if (!signatureResult) {
        return;
      }
      signature = signatureResult;
    }
    conf.url = `${config.cmsOrigin}/api${conf.url}`;
    if (signature) {
      if (conf.query) {
        conf.query.key = signature.k;
        conf.query.nonce = signature.n;
        conf.query.timestamp = '' + signature.t;
        conf.query.signature = signature.s;
      } else {
        conf.query = {
          key: signature.k,
          nonce: signature.n,
          timestamp: '' + signature.t,
          signature: signature.s,
        };
      }
      if (conf.query) {
        const queryPairs: string[] = [];
        for (const key in conf.query) {
          queryPairs.push(`${key}=${encodeURIComponent(conf.query[key])}`);
        }
        if (conf.url.includes('?')) {
          conf.url += `&${queryPairs.join('&')}`;
        } else {
          conf.url += `?${queryPairs.join('&')}`;
        }
      }
      return (await errorWrapper({
        exec: async () => {
          return await Axios(conf);
        },
        onSuccess: async (result) => {
          return result.data as unknown;
        },
        onError: conf.onError,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any;
    }
  };
  const getKeyAccess: GetKeyAccess = async () => {
    if (!keyAccess) {
      const result: BCMSApiKeyAccess = await send({
        url: '/key/access/list',
        method: 'GET',
      });
      keyAccess = result;
    }
    return JSON.parse(JSON.stringify(keyAccess));
  };

  const functionHandler = createBcmsClientFunctionHandler({
    send,
    getKeyAccess,
  });
  const entryHandler = createBcmsClientEntryHandler({
    send,
    getKeyAccess,
  });
  const typeConverterHandler = createBcmsClientTypeConverterHandler({ send });
  const mediaHandler = createBcmsClientMediaHandler({ send });

  return {
    send,
    getKeyAccess,
    function: functionHandler,
    entry: entryHandler,
    typeConverter: typeConverterHandler,
    media: mediaHandler,
  };
}
