import type { AxiosError } from 'axios';
import type {
  SendFunction,
  GetKeyAccess,
  BCMSClientFunctionHandler,
} from '../types';

export function createBcmsClientFunctionHandler({
  send,
  getKeyAccess,
}: {
  send: SendFunction;
  getKeyAccess: GetKeyAccess;
}): BCMSClientFunctionHandler {
  return {
    async call(fnName, payload) {
      const accessList = await getKeyAccess();
      if (!accessList.functions.find((e) => e.name === fnName)) {
        throw Error(
          'You do not have permission to call this function. Allowed functions: ' +
            accessList.functions.join(''),
        );
      }
      const result = await send<
        {
          success: boolean;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          result: any;
        },
        AxiosError
      >({
        url: `/function/${fnName}`,
        method: 'POST',
        data: payload,
        async onError(error) {
          return error;
        },
      });
      if (!result.result) {
        throw result;
      }
      return result;
    },
  };
}
