import { BLOCKS } from './blocks';
import { MARKS } from './marks';
export type TopLevelBlockEnum = BLOCKS.PARAGRAPH | BLOCKS.HEADING_1 | BLOCKS.HEADING_2 | BLOCKS.HEADING_3 | BLOCKS.HEADING_4 | BLOCKS.HEADING_5 | BLOCKS.HEADING_6 | BLOCKS.OL_LIST | BLOCKS.UL_LIST | BLOCKS.HR | BLOCKS.QUOTE | BLOCKS.EMBEDDED_ENTRY | BLOCKS.EMBEDDED_ASSET | BLOCKS.EMBEDDED_RESOURCE | BLOCKS.TABLE | BLOCKS.COLUMN_GROUP;
/**
 * Array of all top level block types.
 * Only these block types can be the direct children of the document.
 */
export declare const TOP_LEVEL_BLOCKS: TopLevelBlockEnum[];
export type ListItemBlockEnum = BLOCKS.PARAGRAPH | BLOCKS.HEADING_1 | BLOCKS.HEADING_2 | BLOCKS.HEADING_3 | BLOCKS.HEADING_4 | BLOCKS.HEADING_5 | BLOCKS.HEADING_6 | BLOCKS.OL_LIST | BLOCKS.UL_LIST | BLOCKS.HR | BLOCKS.QUOTE | BLOCKS.EMBEDDED_ENTRY | BLOCKS.EMBEDDED_ASSET | BLOCKS.EMBEDDED_RESOURCE;
/**
 * Array of all allowed block types inside list items
 */
export declare const LIST_ITEM_BLOCKS: TopLevelBlockEnum[];
export declare const TABLE_BLOCKS: BLOCKS[];
/**
 * Array of all void block types
 */
export declare const VOID_BLOCKS: BLOCKS[];
/**
 * Dictionary of all container block types, and the set block types they accept as children.
 *
 * Note: This does not include `[BLOCKS.DOCUMENT]: TOP_LEVEL_BLOCKS`
 */
export declare const CONTAINERS: {
    "ordered-list": BLOCKS[];
    "unordered-list": BLOCKS[];
    "list-item": TopLevelBlockEnum[];
    blockquote: BLOCKS[];
    table: BLOCKS[];
    column: BLOCKS[];
    "column-group": BLOCKS[];
    "table-row": BLOCKS[];
    "table-cell": BLOCKS[];
    "table-header-cell": BLOCKS[];
};
/**
 * Array of all heading levels
 */
export declare const HEADINGS: BLOCKS[];
/**
 * Array of all block types that may contain text and inline nodes.
 */
export declare const TEXT_CONTAINERS: BLOCKS[];
/**
 * Node types before `tables` release.
 */
export declare const V1_NODE_TYPES: string[];
/**
 * Marks before `superscript` & `subscript` release.
 */
export declare const V1_MARKS: MARKS[];
