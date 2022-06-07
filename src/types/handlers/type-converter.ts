import type {
  BCMSClientTypeConverterLanguage,
  BCMSTypeConverterResultItem,
} from '../models';

export interface BCMSClientTypeConverterHandler {
  getAll(data: {
    language: BCMSClientTypeConverterLanguage;
  }): Promise<BCMSTypeConverterResultItem[]>;
  get(data: {
    language: BCMSClientTypeConverterLanguage;
    itemId: string;
    itemType: 'entry' | 'group' | 'widget' | 'enum' | 'template';
  }): Promise<BCMSTypeConverterResultItem[]>;
}
