import type { BCMSEntryParsed, BCMSEntry } from '../models';

export interface BCMSClientEntryHandler {
  getAll(data: { template: string; lng?: string }): Promise<BCMSEntryParsed[]>;
  getAllRaw(data: { template: string; lng?: string }): Promise<BCMSEntry[]>;
  get(data: {
    template: string;
    entry: string;
    lng?: string;
  }): Promise<BCMSEntryParsed>;
  getRaw(data: {
    template: string;
    entry: string;
    lng?: string;
  }): Promise<BCMSEntry>;
}
