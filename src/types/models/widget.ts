import type { BCMSProp } from '@becomes/cms-client/types/models/prop';
import type { BCMSEntity } from '@becomes/cms-client/types/models/_entity';

export interface BCMSWidget extends BCMSEntity {
    cid: string;
    name: string;
    label: string;
    desc: string;
    previewImage: string;
    previewScript: string;
    previewStyle: string;
    props: BCMSProp[];
}
