import type {
  BCMSClientChangesHandler,
  SendFunction,
  BCMSClientChangesGetInfoData,
} from '@becomes/cms-client/types';

export function createBcmsChangesHandler({
  send,
}: {
  send: SendFunction;
}): BCMSClientChangesHandler {
  return {
    async getInfo() {
      const result = await send<BCMSClientChangesGetInfoData>({
        url: `/changes/info`,
        method: 'GET',
      });
      return result;
    },
  };
}
