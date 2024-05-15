import type { BCMSEntity } from '@becomes/cms-client/types/models/_entity';

export interface BCMSTag extends BCMSEntity {
    /** Unique */
    value: string;
    cid: string;
}
