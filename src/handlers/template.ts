import type {
  BCMSClientTemplateHandler,
  BCMSTemplate,
  SendFunction,
} from '../types';

export function createBcmsClientTemplateHandler({
  send,
}: {
  send: SendFunction;
}): BCMSClientTemplateHandler {
  const basePath = '/template';

  return {
    async getAll() {
      const result = await send<{ items: BCMSTemplate[] }>({
        url: `${basePath}/all`,
        method: 'GET',
      });
      return result.items;
    },
    async get(data) {
      const result = await send<{ item: BCMSTemplate }>({
        url: `${basePath}/${data.template}`,
        method: 'GET',
      });
      return result.item;
    },
  };
}
