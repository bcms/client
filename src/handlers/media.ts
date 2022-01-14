import type {
  BCMSClientMediaBinFn,
  BCMSClientMediaHandler,
  BCMSMedia,
  SendFunction,
} from '../types';

export function createBcmsClientMediaHandler({
  send,
}: {
  send: SendFunction;
}): BCMSClientMediaHandler {
  const basePath = '/media';

  function binFn(media: BCMSMedia): BCMSClientMediaBinFn {
    return async () => {
      return await send<ArrayBuffer>({
        url: `${basePath}/${media._id}/bin`,
        method: 'GET',
        responseType: 'arraybuffer',
      });
    };
  }

  return {
    async download(id) {
      return await send<ArrayBuffer>({
        url: `${basePath}/${id}/bin`,
        method: 'GET',
        responseType: 'arraybuffer',
      });
    },
    async get(id) {
      const result = await send<{ item: BCMSMedia }>({
        url: `${basePath}/${id}`,
        method: 'GET',
      });
      return {
        ...result.item,
        bin: binFn(result.item),
      };
    },
    async getAll() {
      const result = await send<{ items: BCMSMedia[] }>({
        url: `${basePath}/all`,
        method: 'GET',
      });
      return result.items.map((item) => {
        return {
          ...item,
          bin: binFn(item),
        };
      });
    },
  };
}
