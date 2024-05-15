import type {
    BCMSPropValue,
    BCMSPropDataParsed,
} from '@becomes/cms-client/types/models/prop/main';

export interface BCMSPropWidgetData {
    _id: string;
}

export interface BCMSPropWidgetDataParsed {
    [key: string]: BCMSPropDataParsed;
}

export interface BCMSPropValueWidgetData {
    _id: string;
    props: BCMSPropValue[];
}
