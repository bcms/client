import type { BCMSSocketEvent, BCMSSocketEventName } from '../models';

export type BCMSClientSocketEventName = BCMSSocketEventName | string | 'ANY';

export interface BCMSClientSocketEventCallback<Data = BCMSSocketEvent> {
  (data: { eventName: BCMSClientSocketEventName; data: Data }): Promise<void>;
}

export interface BCMSClientSocketHandler {
  id(): string | null;
  connect(): Promise<void>;
  disconnect(): void;
  connected(): boolean;
  emit<Data = BCMSSocketEvent>(event: string, data: Data): void;
  subscribe<CallbackData = BCMSSocketEvent>(
    event: BCMSClientSocketEventName,
    callback: BCMSClientSocketEventCallback<CallbackData>,
  ): () => void;
}
