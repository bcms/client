import type { BCMSMedia } from '../models';

export interface BCMSClientMediaBinFn {
  (data?: { onProgress?(progress: number): void }): Promise<ArrayBuffer>;
}

export interface BCMSClientMediaResponseItem extends BCMSMedia {
  bin: BCMSClientMediaBinFn;
}

export interface BCMSClientMediaHandler {
  getAll(data?: {
    skipCache?: boolean;
  }): Promise<BCMSClientMediaResponseItem[]>;
  get(id: string, skipCache?: boolean): Promise<BCMSClientMediaResponseItem>;
  download(id: string, skipCache?: boolean): Promise<ArrayBuffer>;
}
