import type { BCMSPropValue } from "./main";

export interface BCMSPropGroupPointerData {
  _id: string;
}

export interface BCMSPropValueGroupPointerData {
  _id: string;
  items: Array<{
    props: BCMSPropValue[];
  }>;
}
