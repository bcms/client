import type { BCMSUserPolicyCRUD } from './user';
import type { BCMSEntity } from './_entity';

export interface BCMSApiKeyAccess {
  templates: Array<BCMSUserPolicyCRUD & { _id: string }>;
  functions: Array<{
    name: string;
  }>;
}

export interface BCMSApiKey extends BCMSEntity {
  userId: string;
  name: string;
  desc: string;
  blocked: boolean;
  secret: string;
  access: BCMSApiKeyAccess;
}

export interface BCMSApiKeySignature {
  /** Key */
  k: string;
  /** Timestamp */
  t: number | string;
  /** Nonce */
  n: string;
  /** Signature */
  s: string;
}
