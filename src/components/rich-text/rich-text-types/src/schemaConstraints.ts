import { BLOCKS } from './blocks';
import { INLINES } from './inlines';
import { MARKS } from './marks';

export type TopLevelBlockEnum =
  | BLOCKS.PARAGRAPH
  | BLOCKS.HEADING_1
  | BLOCKS.HEADING_2
  | BLOCKS.HEADING_3
  | BLOCKS.HEADING_4
  | BLOCKS.HEADING_5
  | BLOCKS.HEADING_6
  | BLOCKS.OL_LIST
  | BLOCKS.UL_LIST
  | BLOCKS.HR
  | BLOCKS.QUOTE
  | BLOCKS.EMBEDDED_ENTRY
  | BLOCKS.EMBEDDED_ASSET
  | BLOCKS.EMBEDDED_RESOURCE
  | BLOCKS.TABLE
  | BLOCKS.COLUMN_GROUP;

/**
 * Array of all top level block types.
 * Only these block types can be the direct children of the document.
 */
export const TOP_LEVEL_BLOCKS: TopLevelBlockEnum[] = [
  BLOCKS.PARAGRAPH,
  BLOCKS.HEADING_1,
  BLOCKS.HEADING_2,
  BLOCKS.HEADING_3,
  BLOCKS.HEADING_4,
  BLOCKS.HEADING_5,
  BLOCKS.HEADING_6,
  BLOCKS.OL_LIST,
  BLOCKS.UL_LIST,
  BLOCKS.HR,
  BLOCKS.QUOTE,
  BLOCKS.EMBEDDED_ENTRY,
  BLOCKS.EMBEDDED_ASSET,
  BLOCKS.EMBEDDED_RESOURCE,
  BLOCKS.TABLE,
  BLOCKS.COLUMN_GROUP,
];

export type ListItemBlockEnum =
  | BLOCKS.PARAGRAPH
  | BLOCKS.HEADING_1
  | BLOCKS.HEADING_2
  | BLOCKS.HEADING_3
  | BLOCKS.HEADING_4
  | BLOCKS.HEADING_5
  | BLOCKS.HEADING_6
  | BLOCKS.OL_LIST
  | BLOCKS.UL_LIST
  | BLOCKS.HR
  | BLOCKS.QUOTE
  | BLOCKS.EMBEDDED_ENTRY
  | BLOCKS.EMBEDDED_ASSET
  | BLOCKS.EMBEDDED_RESOURCE;

/**
 * Array of all allowed block types inside list items
 */
export const LIST_ITEM_BLOCKS: TopLevelBlockEnum[] = [
  BLOCKS.PARAGRAPH,
  BLOCKS.HEADING_1,
  BLOCKS.HEADING_2,
  BLOCKS.HEADING_3,
  BLOCKS.HEADING_4,
  BLOCKS.HEADING_5,
  BLOCKS.HEADING_6,
  BLOCKS.OL_LIST,
  BLOCKS.UL_LIST,
  BLOCKS.HR,
  BLOCKS.QUOTE,
  BLOCKS.EMBEDDED_ENTRY,
  BLOCKS.EMBEDDED_ASSET,
  BLOCKS.EMBEDDED_RESOURCE,
];

export const TABLE_BLOCKS = [
  BLOCKS.TABLE,
  BLOCKS.TABLE_ROW,
  BLOCKS.TABLE_CELL,
  BLOCKS.TABLE_HEADER_CELL,
];

/**
 * Array of all void block types
 */
export const VOID_BLOCKS = [
  BLOCKS.HR,
  BLOCKS.EMBEDDED_ENTRY,
  BLOCKS.EMBEDDED_ASSET,
  BLOCKS.EMBEDDED_RESOURCE,
];

/**
 * Dictionary of all container block types, and the set block types they accept as children.
 *
 * Note: This does not include `[BLOCKS.DOCUMENT]: TOP_LEVEL_BLOCKS`
 */
export const CONTAINERS = {
  [BLOCKS.OL_LIST]: [BLOCKS.LIST_ITEM],
  [BLOCKS.UL_LIST]: [BLOCKS.LIST_ITEM],
  [BLOCKS.LIST_ITEM]: LIST_ITEM_BLOCKS,
  [BLOCKS.QUOTE]: [BLOCKS.PARAGRAPH],
  [BLOCKS.TABLE]: [BLOCKS.TABLE_ROW],
  [BLOCKS.COLUMN]: [BLOCKS.COLUMN],
  [BLOCKS.COLUMN_GROUP]: [BLOCKS.COLUMN_GROUP],
  [BLOCKS.TABLE_ROW]: [BLOCKS.TABLE_CELL, BLOCKS.TABLE_HEADER_CELL],
  [BLOCKS.TABLE_CELL]: [BLOCKS.PARAGRAPH, BLOCKS.UL_LIST, BLOCKS.OL_LIST],
  [BLOCKS.TABLE_HEADER_CELL]: [BLOCKS.PARAGRAPH],
};

/**
 * Array of all heading levels
 */
export const HEADINGS = [
  BLOCKS.HEADING_1,
  BLOCKS.HEADING_2,
  BLOCKS.HEADING_3,
  BLOCKS.HEADING_4,
  BLOCKS.HEADING_5,
  BLOCKS.HEADING_6,
];

/**
 * Array of all block types that may contain text and inline nodes.
 */
export const TEXT_CONTAINERS = [BLOCKS.PARAGRAPH, ...HEADINGS];

/**
 * Node types before `tables` release.
 */
export const V1_NODE_TYPES = [
  BLOCKS.DOCUMENT,
  BLOCKS.PARAGRAPH,
  BLOCKS.HEADING_1,
  BLOCKS.HEADING_2,
  BLOCKS.HEADING_3,
  BLOCKS.HEADING_4,
  BLOCKS.HEADING_5,
  BLOCKS.HEADING_6,
  BLOCKS.OL_LIST,
  BLOCKS.UL_LIST,
  BLOCKS.LIST_ITEM,
  BLOCKS.HR,
  BLOCKS.QUOTE,
  BLOCKS.EMBEDDED_ENTRY,
  BLOCKS.EMBEDDED_ASSET,
  INLINES.HYPERLINK,
  INLINES.ENTRY_HYPERLINK,
  INLINES.ASSET_HYPERLINK,
  INLINES.EMBEDDED_ENTRY,
  'text',
];

/**
 * Marks before `superscript` & `subscript` release.
 */
export const V1_MARKS = [MARKS.BOLD, MARKS.CODE, MARKS.ITALIC, MARKS.UNDERLINE];