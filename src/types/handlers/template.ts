import type { BCMSTemplate } from '../models';

export interface BCMSClientTemplateHandler {
  get(data: { template: string }): Promise<BCMSTemplate>;
}
