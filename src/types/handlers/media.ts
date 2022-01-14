import type { BCMSMedia } from '../models';

export interface BCMSClientMediaBinFn {
  (): Promise<ArrayBuffer>;
}

export interface BCMSClientMediaResponseItem extends BCMSMedia {
  bin: BCMSClientMediaBinFn;
}

export interface BCMSClientMediaHandler {
  getAll(): Promise<BCMSClientMediaResponseItem[]>;
  get(id: string): Promise<BCMSClientMediaResponseItem>;
  download(id: string): Promise<ArrayBuffer>;
}
