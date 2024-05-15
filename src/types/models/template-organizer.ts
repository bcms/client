import type { BCMSEntity } from '@becomes/cms-client/types/models/_entity';

export interface BCMSTemplateOrganizer extends BCMSEntity {
    parentId?: string;
    label: string;
    name: string;
    templateIds: string[];
}
