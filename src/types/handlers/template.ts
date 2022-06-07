import type { BCMSTemplate } from '../models';

export interface BCMSClientTemplateHandler {
  get(data: { template: string; skipCache?: boolean }): Promise<BCMSTemplate>;
  getAll(data?: { skipCache?: boolean }): Promise<BCMSTemplate[]>;
}
