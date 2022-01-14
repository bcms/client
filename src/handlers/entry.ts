import type {
  BCMSClientEntryHandler,
  BCMSEntryParsed,
  GetKeyAccess,
  SendFunction,
} from '../types';

export function createBcmsClientEntryHandler({
  send,
  getKeyAccess,
}: {
  send: SendFunction;
  getKeyAccess: GetKeyAccess;
}): BCMSClientEntryHandler {
  return {
    async getAll(data) {
      const keyAccess = await getKeyAccess();
      const access = keyAccess.templates.find((e) => e._id === data.templateId);
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ items: BCMSEntryParsed[] }>({
        url: `/entry/all/${data.templateId}/parse`,
        method: 'GET',
      });
      return result.items;
    },
    async getAllRaw(data) {
      return [];
    },
    async get(data) {
      return undefined as never;
    },
    async getRaw(data) {
      return undefined as never;
    },
  };
}
