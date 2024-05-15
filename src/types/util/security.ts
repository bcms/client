import type { BCMSApiKeySignature } from '@becomes/cms-client/types/models';

/**
 * The Client security handler.
 */
export interface BCMSClientSecurity {
    /**
     * Sign a request using API key.
     */
    sign<Payload>(payload: Payload): BCMSApiKeySignature;
}
