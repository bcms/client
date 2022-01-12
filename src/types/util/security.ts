import type { BCMSApiKeySignature } from '../models';

export interface BCMSClientSecurity {
  sign<Payload>(payload: Payload): BCMSApiKeySignature;
}
