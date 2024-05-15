import type { BCMSProp } from '@becomes/cms-client/types/models/prop';
import type { BCMSEntity } from '@becomes/cms-client/types/models/_entity';

export interface BCMSTemplate extends BCMSEntity {
    cid: string;
    name: string;
    label: string;
    desc: string;
    userId: string;
    singleEntry: boolean;
    props: BCMSProp[];
}
