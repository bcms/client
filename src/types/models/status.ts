import type { BCMSEntity } from '@becomes/cms-client/types/models/_entity';

export interface BCMSStatus extends BCMSEntity {
    label: string;
    name: string;
    color: string;
}
