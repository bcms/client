import type { BCMSEntity } from '@becomes/cms-client/types/models/_entity';

export interface BCMSIdCounter extends BCMSEntity {
    name: string;
    forId: string;
    count: number;
}
