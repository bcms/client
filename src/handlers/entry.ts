import type {
  BCMSClientEntryHandler,
  BCMSEntry,
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
      const keyAccess = await getKeyAccess();
      const access = keyAccess.templates.find((e) => e._id === data.templateId);
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ items: BCMSEntry[] }>({
        url: `/entry/all/${data.templateId}`,
        method: 'GET',
      });
      return result.items;
    },
    async get(data) {
      const keyAccess = await getKeyAccess();
      const access = keyAccess.templates.find((e) => e._id === data.templateId);
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ item: BCMSEntryParsed }>({
        url: `/entry/all/${data.templateId}/${data.entryId}/parse`,
        method: 'GET',
      });
      return result.item;
    },
    async getRaw(data) {
      const keyAccess = await getKeyAccess();
      const access = keyAccess.templates.find((e) => e._id === data.templateId);
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ item: BCMSEntry }>({
        url: `/entry/all/${data.templateId}/${data.entryId}`,
        method: 'GET',
      });
      return result.item;
    },
  };
}
