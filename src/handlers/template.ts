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
    async get(data) {
      const result = await send<{ item: BCMSTemplate }>({
        url: `${basePath}/${data.templateId}`,
        method: 'GET',
      });
      return result.item;
    },
  };
}
