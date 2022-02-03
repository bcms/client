import { Prop, PropType, PropParsed } from './prop';

export interface EntryMeta {
  lng: string;
  props: Prop[];
}
export interface EntryContent {
  lng: string;
  props: Prop[];
}

export interface EntryLite {
  _id: string;
  createdAt: number;
  updatedAt: number;
  templateId: string;
  userId: string;
  meta: EntryMeta[];
}

export interface Entry {
  _id: string;
  createdAt: number;
  updatedAt: number;
  templateId: string;
  userId: string;
  meta: EntryMeta[];
  content?: EntryContent[];
}

export type EntryContentParsedItem = {
  type: PropType;
  value: PropParsed;
  name: string;
};
export type EntryContentParsed = EntryContentParsedItem[];
export interface EntryMetaParsed {
  [lng: string]: {
    [name: string]: PropParsed
  };
}
export interface EntryParsed {
  _id: string;
  createdAt: number;
  updatedAt: number;
  templateId: string;
  userId: string;
  meta: EntryMetaParsed;
  content: {
    [lng: string]: EntryContentParsed;
  };
}
