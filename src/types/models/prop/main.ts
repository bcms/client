import type { BCMSPropRichTextData, BCMSPropValueRichTextData } from './rich-text';
import type { BCMSPropColorPickerData } from './color-picker';
import type { BCMSPropDateData } from './date';
import type { BCMSPropEntryPointerData } from './entry-pointer';
import type { BCMSPropEnumData } from './enum';
import type {
  BCMSPropGroupPointerData,
  BCMSPropValueGroupPointerData,
} from './group-pointer';
import type { BCMSPropMediaData } from './media';
import type { BCMSPropValueWidgetData, BCMSPropWidgetData } from './widget';

// eslint-disable-next-line no-shadow
export enum BCMSPropType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',

  DATE = 'DATE',
  ENUMERATION = 'ENUMERATION',
  MEDIA = 'MEDIA',

  GROUP_POINTER = 'GROUP_POINTER',
  ENTRY_POINTER = 'ENTRY_POINTER',
  WIDGET = 'WIDGET',

  COLOR_PICKER = 'COLOR_PICKER',
  RICH_TEXT = 'RICH_TEXT',
  TAG = 'TAG',
}

export type BCMSPropData =
  | string[]
  | boolean[]
  | number[]
  | BCMSPropDateData
  | BCMSPropEnumData
  | BCMSPropEntryPointerData
  | BCMSPropGroupPointerData
  | BCMSPropMediaData[]
  | BCMSPropWidgetData
  | BCMSPropRichTextData[]
  | BCMSPropColorPickerData;
export interface BCMSProp {
  id: string;
  type: BCMSPropType;
  required: boolean;
  name: string;
  label: string;
  array: boolean;
  defaultData: BCMSPropData;
}

export interface BCMSPropValue {
  /**
   * This property value is the same as in BCMSProp.
   * Using it, prop can be connected with metadata.
   */
  id: string;
  data: BCMSPropValueData;
}

export type BCMSPropValueData =
  | string[]
  | boolean[]
  | number[]
  | BCMSPropDateData
  | BCMSPropValueGroupPointerData
  | BCMSPropMediaData[]
  | BCMSPropValueWidgetData
  | BCMSPropValueRichTextData[];
