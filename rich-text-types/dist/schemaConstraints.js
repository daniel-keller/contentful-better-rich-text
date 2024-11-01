"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1_MARKS = exports.V1_NODE_TYPES = exports.TEXT_CONTAINERS = exports.HEADINGS = exports.CONTAINERS = exports.VOID_BLOCKS = exports.TABLE_BLOCKS = exports.LIST_ITEM_BLOCKS = exports.TOP_LEVEL_BLOCKS = void 0;
var blocks_1 = require("./blocks");
var inlines_1 = require("./inlines");
var marks_1 = require("./marks");
/**
 * Array of all top level block types.
 * Only these block types can be the direct children of the document.
 */
exports.TOP_LEVEL_BLOCKS = [
    blocks_1.BLOCKS.PARAGRAPH,
    blocks_1.BLOCKS.HEADING_1,
    blocks_1.BLOCKS.HEADING_2,
    blocks_1.BLOCKS.HEADING_3,
    blocks_1.BLOCKS.HEADING_4,
    blocks_1.BLOCKS.HEADING_5,
    blocks_1.BLOCKS.HEADING_6,
    blocks_1.BLOCKS.OL_LIST,
    blocks_1.BLOCKS.UL_LIST,
    blocks_1.BLOCKS.HR,
    blocks_1.BLOCKS.QUOTE,
    blocks_1.BLOCKS.EMBEDDED_ENTRY,
    blocks_1.BLOCKS.EMBEDDED_ASSET,
    blocks_1.BLOCKS.EMBEDDED_RESOURCE,
    blocks_1.BLOCKS.TABLE,
    blocks_1.BLOCKS.COLUMN_GROUP,
];
/**
 * Array of all allowed block types inside list items
 */
exports.LIST_ITEM_BLOCKS = [
    blocks_1.BLOCKS.PARAGRAPH,
    blocks_1.BLOCKS.HEADING_1,
    blocks_1.BLOCKS.HEADING_2,
    blocks_1.BLOCKS.HEADING_3,
    blocks_1.BLOCKS.HEADING_4,
    blocks_1.BLOCKS.HEADING_5,
    blocks_1.BLOCKS.HEADING_6,
    blocks_1.BLOCKS.OL_LIST,
    blocks_1.BLOCKS.UL_LIST,
    blocks_1.BLOCKS.HR,
    blocks_1.BLOCKS.QUOTE,
    blocks_1.BLOCKS.EMBEDDED_ENTRY,
    blocks_1.BLOCKS.EMBEDDED_ASSET,
    blocks_1.BLOCKS.EMBEDDED_RESOURCE,
];
exports.TABLE_BLOCKS = [
    blocks_1.BLOCKS.TABLE,
    blocks_1.BLOCKS.TABLE_ROW,
    blocks_1.BLOCKS.TABLE_CELL,
    blocks_1.BLOCKS.TABLE_HEADER_CELL,
];
/**
 * Array of all void block types
 */
exports.VOID_BLOCKS = [
    blocks_1.BLOCKS.HR,
    blocks_1.BLOCKS.EMBEDDED_ENTRY,
    blocks_1.BLOCKS.EMBEDDED_ASSET,
    blocks_1.BLOCKS.EMBEDDED_RESOURCE,
];
/**
 * Dictionary of all container block types, and the set block types they accept as children.
 *
 * Note: This does not include `[BLOCKS.DOCUMENT]: TOP_LEVEL_BLOCKS`
 */
exports.CONTAINERS = (_a = {},
    _a[blocks_1.BLOCKS.OL_LIST] = [blocks_1.BLOCKS.LIST_ITEM],
    _a[blocks_1.BLOCKS.UL_LIST] = [blocks_1.BLOCKS.LIST_ITEM],
    _a[blocks_1.BLOCKS.LIST_ITEM] = exports.LIST_ITEM_BLOCKS,
    _a[blocks_1.BLOCKS.QUOTE] = [blocks_1.BLOCKS.PARAGRAPH],
    _a[blocks_1.BLOCKS.TABLE] = [blocks_1.BLOCKS.TABLE_ROW],
    _a[blocks_1.BLOCKS.COLUMN] = [blocks_1.BLOCKS.COLUMN],
    _a[blocks_1.BLOCKS.COLUMN_GROUP] = [blocks_1.BLOCKS.COLUMN_GROUP],
    _a[blocks_1.BLOCKS.TABLE_ROW] = [blocks_1.BLOCKS.TABLE_CELL, blocks_1.BLOCKS.TABLE_HEADER_CELL],
    _a[blocks_1.BLOCKS.TABLE_CELL] = [blocks_1.BLOCKS.PARAGRAPH, blocks_1.BLOCKS.UL_LIST, blocks_1.BLOCKS.OL_LIST],
    _a[blocks_1.BLOCKS.TABLE_HEADER_CELL] = [blocks_1.BLOCKS.PARAGRAPH],
    _a);
/**
 * Array of all heading levels
 */
exports.HEADINGS = [
    blocks_1.BLOCKS.HEADING_1,
    blocks_1.BLOCKS.HEADING_2,
    blocks_1.BLOCKS.HEADING_3,
    blocks_1.BLOCKS.HEADING_4,
    blocks_1.BLOCKS.HEADING_5,
    blocks_1.BLOCKS.HEADING_6,
];
/**
 * Array of all block types that may contain text and inline nodes.
 */
exports.TEXT_CONTAINERS = __spreadArray([blocks_1.BLOCKS.PARAGRAPH], exports.HEADINGS, true);
/**
 * Node types before `tables` release.
 */
exports.V1_NODE_TYPES = [
    blocks_1.BLOCKS.DOCUMENT,
    blocks_1.BLOCKS.PARAGRAPH,
    blocks_1.BLOCKS.HEADING_1,
    blocks_1.BLOCKS.HEADING_2,
    blocks_1.BLOCKS.HEADING_3,
    blocks_1.BLOCKS.HEADING_4,
    blocks_1.BLOCKS.HEADING_5,
    blocks_1.BLOCKS.HEADING_6,
    blocks_1.BLOCKS.OL_LIST,
    blocks_1.BLOCKS.UL_LIST,
    blocks_1.BLOCKS.LIST_ITEM,
    blocks_1.BLOCKS.HR,
    blocks_1.BLOCKS.QUOTE,
    blocks_1.BLOCKS.EMBEDDED_ENTRY,
    blocks_1.BLOCKS.EMBEDDED_ASSET,
    inlines_1.INLINES.HYPERLINK,
    inlines_1.INLINES.ENTRY_HYPERLINK,
    inlines_1.INLINES.ASSET_HYPERLINK,
    inlines_1.INLINES.EMBEDDED_ENTRY,
    'text',
];
/**
 * Marks before `superscript` & `subscript` release.
 */
exports.V1_MARKS = [marks_1.MARKS.BOLD, marks_1.MARKS.CODE, marks_1.MARKS.ITALIC, marks_1.MARKS.UNDERLINE];
//# sourceMappingURL=schemaConstraints.js.map