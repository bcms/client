import type {
    BCMSEntryContentNode,
    BCMSEntryContentParsedItem,
} from '@becomes/cms-client/types/models/entry';

export interface BCMSPropRichTextData {
    nodes: BCMSEntryContentNode[];
}

export interface BCMSPropValueRichTextData {
    nodes: BCMSEntryContentNode[];
}

export type BCMSPropRichTextDataParsed =
    | BCMSEntryContentParsedItem[]
    | BCMSEntryContentParsedItem[][];
