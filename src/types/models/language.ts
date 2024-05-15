import type { BCMSEntity } from '@becomes/cms-client/types/models/_entity';

export interface BCMSLanguage extends BCMSEntity {
    userId: string;
    code: string;
    name: string;
    nativeName: string;
    def: boolean;
}
