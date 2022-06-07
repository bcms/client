export interface BCMSClientFunctionHandler {
  call<Payload, Result>(
    functionName: string,
    payload?: Payload,
  ): Promise<{
    success: boolean;
    result: Result;
  }>;
}
