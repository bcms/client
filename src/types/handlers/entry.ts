import type { BCMSEntryParsed, BCMSEntry } from '../models';

export interface BCMSClientEntryHandler {
  getAll(data: {
    template: string;
    lng?: string;
    maxDepth?: number;
    skipCache?: boolean;
  }): Promise<BCMSEntryParsed[]>;
  getAllRaw(data: {
    template: string;
    lng?: string;
    skipCache?: boolean;
  }): Promise<BCMSEntry[]>;
  get(data: {
    template: string;
    entry: string;
    lng?: string;
    maxDepth?: number;
    skipCache?: boolean;
  }): Promise<BCMSEntryParsed>;
  getRaw(data: {
    template: string;
    entry: string;
    lng?: string;
    skipCache?: boolean;
  }): Promise<BCMSEntry>;
}
