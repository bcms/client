import type { AxiosError, AxiosRequestConfig } from 'axios';
import type { BCMSClientFunctionHandler } from '.';
import type { BCMSApiKeyAccess } from './models';

export interface BCMSClient {
  getKeyAccess(): Promise<BCMSApiKeyAccess>;
  send: SendFunction;
  function: BCMSClientFunctionHandler;
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
