import type {
    BCMSPropDataParsed,
    BCMSPropValue,
} from '@becomes/cms-client/types';

export interface BCMSPropGroupPointerData {
    _id: string;
}

export interface BCMSPropGroupPointerDataParsed {
    [key: string]: BCMSPropDataParsed | BCMSPropDataParsed[];
}

export interface BCMSPropValueGroupPointerData {
    _id: string;
    items: Array<{
        props: BCMSPropValue[];
    }>;
}
