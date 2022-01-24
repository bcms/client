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
      const access = keyAccess.templates.find(
        (e) => e._id === data.template || e.name === data.template,
      );
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ items: BCMSEntryParsed[] }>({
        url: `/entry/all/${data.template}/parse`,
        method: 'GET',
      });
      return result.items;
    },
    async getAllRaw(data) {
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
      return result.items;
    },
    async get(data) {
      const keyAccess = await getKeyAccess();
      const access = keyAccess.templates.find(
        (e) => e._id === data.template || e.name === data.template,
      );
      if (!access || !access.get) {
        throw Error('Key cannot access this template.');
      }
      const result = await send<{ item: BCMSEntryParsed }>({
        url: `/entry/${data.template}/${data.entry}/parse`,
        method: 'GET',
      });
      return result.item;
    },
    async getRaw(data) {
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
      return result.item;
    },
  };
}
