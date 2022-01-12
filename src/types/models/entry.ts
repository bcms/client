import type { BCMSPropValue, BCMSPropValueWidgetData } from './prop';
import type { BCMSEntity } from './_entity';

export interface BCMSEntryContent {
  lng: string;
  nodes: BCMSEntryContentNode[];
  plainText: string;
}

export interface BCMSEntryContentNode {
  type: BCMSEntryContentNodeType;
  content?: BCMSEntryContentNode[];
  attrs?:
    | BCMSEntryContentNodeHeadingAttr
    | BCMSPropValueWidgetData
    | BCMSEntryContentNodeLinkAttr
    | BCMSEntryContentNodeCodeBlockAttr;
  marks?: BCMSEntryContentNodeMarker[];
  text?: string;
}

export interface BCMSEntryContentNodeCodeBlockAttr {
  language: string | null;
}

export interface BCMSEntryContentNodeHeadingAttr {
  level: number;
}

export interface BCMSEntryContentNodeLinkAttr {
  href: string;
  target: string;
}

export interface BCMSEntryContentNodeMarker {
  type: BCMSEntryContentNodeMarkerType;
  attrs?: BCMSEntryContentNodeLinkAttr;
}

// eslint-disable-next-line no-shadow
export enum BCMSEntryContentNodeType {
  paragraph = 'paragraph',
  heading = 'heading',
  widget = 'widget',
  bulletList = 'bulletList',
  listItem = 'listItem',
  orderedList = 'orderedList',
  text = 'text',
  codeBlock = 'codeBlock',
}

// eslint-disable-next-line no-shadow
export enum BCMSEntryContentNodeMarkerType {
  bold = 'bold',
  italic = 'italic',
  underline = 'underline',
  strike = 'strike',
  link = 'link',
}

export interface BCMSEntryMeta {
  lng: string;
  props: BCMSPropValue[];
}

export interface BCMSEntry extends BCMSEntity {
  cid: string;
  templateId: string;
  userId: string;
  status?: string;
  meta: BCMSEntryMeta[];
  content: BCMSEntryContent[];
}
