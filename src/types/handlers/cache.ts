import type {
  BCMSEntry,
  BCMSEntryParsed,
  BCMSMedia,
  BCMSTemplate,
} from '../models';

export interface BCMSClientCacheItem {
  _id: string;
}

export interface BCMSClientCacheQuery<Item extends BCMSClientCacheItem> {
  (item: Item, items: Item[]): unknown;
}

export interface BCMSClientCache<Item extends BCMSClientCacheItem> {
  find(query: BCMSClientCacheQuery<Item>): Item[];
  findOne(query: BCMSClientCacheQuery<Item>): Item | null;
  items(): Item[];
  set(items: Item | Item[]): void;
  remove(
    item:
      | Item
      | Item[]
      | BCMSClientCacheItem
      | BCMSClientCacheItem[]
      | string
      | string[],
  ): void;
  all: boolean;
}

export interface BCMSClientCacheManager {
  entry: BCMSClientCache<BCMSEntry>;
  entryParsed: BCMSClientCache<BCMSEntryParsed>;
  template: BCMSClientCache<BCMSTemplate>;
  media: BCMSClientCache<BCMSMedia>;
}
