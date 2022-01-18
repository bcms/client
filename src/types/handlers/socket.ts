import type { BCMSSocketEvent, BCMSSocketEventName } from '..';

type EventName = BCMSSocketEventName | 'ANY';

export interface BCMSClientSocketEventCallback<Data = BCMSSocketEvent> {
  (data: { eventName: EventName; data: Data }): Promise<void>;
}

export interface BCMSClientSocketHandler {
  id(): string | null;
  connect(): Promise<void>;
  disconnect(): void;
  connected(): boolean;
  emit<Data>(event: string, data: Data): void;
  subscribe<CallbackData = BCMSSocketEvent>(
    event: EventName,
    callback: BCMSClientSocketEventCallback<CallbackData>,
  ): () => void;
}
