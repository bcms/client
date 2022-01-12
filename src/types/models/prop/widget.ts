import type { BCMSPropValue } from './main';

export interface BCMSPropWidgetData {
  _id: string;
}

export interface BCMSPropValueWidgetData {
  _id: string;
  props: BCMSPropValue[];
}
