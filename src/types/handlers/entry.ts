import type { BCMSEntryParsed, BCMSEntry } from '../models';

export interface BCMSClientEntryHandler {
  getAll(data: { templateId: string }): Promise<BCMSEntryParsed[]>;
  getAllRaw(data: { templateId: string }): Promise<BCMSEntry[]>;
  get(data: { templateId: string; entryId: string }): Promise<BCMSEntryParsed>;
  getRaw(data: { templateId: string; entryId: string }): Promise<BCMSEntry>;
}
