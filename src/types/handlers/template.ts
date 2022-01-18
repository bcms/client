import type { BCMSTemplate } from '../models';

export interface BCMSClientTemplateHandler {
  get(data: { templateId: string }): Promise<BCMSTemplate>;
}
