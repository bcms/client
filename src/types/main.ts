import type { AxiosError, AxiosRequestConfig } from 'axios';
import type {
  BCMSClientEntryHandler,
  BCMSClientFunctionHandler,
  BCMSClientTypeConverterHandler,
  BCMSClientMediaHandler,
} from './handlers';
import type { BCMSApiKeyAccess } from './models';

export interface BCMSClient {
  getKeyAccess(): Promise<BCMSApiKeyAccess>;
  send: SendFunction;
  function: BCMSClientFunctionHandler;
  entry: BCMSClientEntryHandler;
  typeConverter: BCMSClientTypeConverterHandler;
  media: BCMSClientMediaHandler;
}

export interface SendFunction {
  <ResultBody = unknown, ErrorResult = unknown>(
    config: AxiosRequestConfig & {
      onError?(error: AxiosError): Promise<ErrorResult>;
      doNotUseAuth?: boolean;
      query?: {
        [name: string]: string;
      };
    },
  ): Promise<ResultBody>;
}

export interface GetKeyAccess {
  (): Promise<BCMSApiKeyAccess>;
}
