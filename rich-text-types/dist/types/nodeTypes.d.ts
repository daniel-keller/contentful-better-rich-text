import { BLOCKS } from './blocks';
import { INLINES } from './inlines';
import { Block, Inline, ListItemBlock, Text } from './types';
type EmptyNodeData = {};
export interface Heading1 extends Block {
    nodeType: BLOCKS.HEADING_1;
    data: EmptyNodeData;
    content: Array<Inline | Text>;
}
export interface Heading2 extends Block {
    nodeType: BLOCKS.HEADING_2;
    data: EmptyNodeData;
    content: Array<Inline | Text>;
}
export interface Heading3 extends Block {
    nodeType: BLOCKS.HEADING_3;
    data: EmptyNodeData;
    content: Array<Inline | Text>;
}
export interface Heading4 extends Block {
    nodeType: BLOCKS.HEADING_4;
    data: EmptyNodeData;
    content: Array<Inline | Text>;
}
export interface Heading5 extends Block {
    nodeType: BLOCKS.HEADING_5;
    data: EmptyNodeData;
    content: Array<Inline | Text>;
}
export interface Heading6 extends Block {
    nodeType: BLOCKS.HEADING_6;
    data: EmptyNodeData;
    content: Array<Inline | Text>;
}
export interface Paragraph extends Block {
    nodeType: BLOCKS.PARAGRAPH;
    data: EmptyNodeData;
    content: Array<Inline | Text>;
}
export interface Quote extends Block {
    nodeType: BLOCKS.QUOTE;
    data: EmptyNodeData;
    content: Paragraph[];
}
export interface Hr extends Block {
    nodeType: BLOCKS.HR;
    /**
     *
     * @maxItems 0
     */
    data: EmptyNodeData;
    content: Array<Inline | Text>;
}
export interface OrderedList extends Block {
    nodeType: BLOCKS.OL_LIST;
    data: EmptyNodeData;
    content: ListItem[];
}
export interface UnorderedList extends Block {
    nodeType: BLOCKS.UL_LIST;
    data: EmptyNodeData;
    content: ListItem[];
}
export interface ListItem extends Block {
    nodeType: BLOCKS.LIST_ITEM;
    data: EmptyNodeData;
    content: ListItemBlock[];
}
export interface Link<T extends string = string> {
    sys: {
        type: 'Link';
        linkType: T;
        id: string;
    };
}
export interface ResourceLink {
    sys: {
        type: 'ResourceLink';
        linkType: 'Contentful:Entry';
        urn: string;
    };
}
export interface EntryLinkBlock extends Block {
    nodeType: BLOCKS.EMBEDDED_ENTRY;
    data: {
        target: Link<'Entry'>;
    };
    /**
     *
     * @maxItems 0
     */
    content: Array<Inline | Text>;
}
export interface AssetLinkBlock extends Block {
    nodeType: BLOCKS.EMBEDDED_ASSET;
    data: {
        target: Link<'Asset'>;
    };
    /**
     *
     * @maxItems 0
     */
    content: Array<Inline | Text>;
}
export interface ResourceLinkBlock extends Block {
    nodeType: BLOCKS.EMBEDDED_RESOURCE;
    data: {
        target: ResourceLink;
    };
    /**
     *
     * @maxItems 0
     */
    content: Array<Inline | Text>;
}
export interface EntryLinkInline extends Inline {
    nodeType: INLINES.EMBEDDED_ENTRY;
    data: {
        target: Link<'Entry'>;
    };
    /**
     *
     * @maxItems 0
     */
    content: Text[];
}
export interface AssetLinkInline extends Inline {
    nodeType: INLINES.EMBEDDED_ASSET;
    data: {
        target: Link<'Asset'>;
    };
    /**
     *
     * @maxItems 0
     */
    content: Text[];
}
export interface ResourceLinkInline extends Inline {
    nodeType: INLINES.EMBEDDED_RESOURCE;
    data: {
        target: ResourceLink;
    };
    /**
     *
     * @maxItems 0
     */
    content: Text[];
}
export interface Hyperlink extends Inline {
    nodeType: INLINES.HYPERLINK;
    data: {
        uri: string;
    };
    content: Text[];
}
export interface AssetHyperlink extends Inline {
    nodeType: INLINES.ASSET_HYPERLINK;
    data: {
        target: Link<'Asset'>;
    };
    content: Text[];
}
export interface EntryHyperlink extends Inline {
    nodeType: INLINES.ENTRY_HYPERLINK;
    data: {
        target: Link<'Entry'>;
    };
    content: Text[];
}
export interface ResourceHyperlink extends Inline {
    nodeType: INLINES.RESOURCE_HYPERLINK;
    data: {
        target: ResourceLink;
    };
    content: Text[];
}
export interface Column extends Block {
    nodeType: BLOCKS.COLUMN;
    data: EmptyNodeData;
    /**
     * @minItems 1
     */
    content: Array<Inline | Block>;
}
export interface ColumnGroup extends Block {
    nodeType: BLOCKS.COLUMN_GROUP;
    data: {
        layout: number[];
        gap?: number;
    };
    /**
     * @minItems 1
     */
    content: Column[];
}
export interface TableCell extends Block {
    nodeType: BLOCKS.TABLE_HEADER_CELL | BLOCKS.TABLE_CELL;
    data: {
        colspan?: number;
        rowspan?: number;
    };
    /**
     * @minItems 1
     */
    content: Paragraph[];
}
export interface TableHeaderCell extends TableCell {
    nodeType: BLOCKS.TABLE_HEADER_CELL;
}
export interface TableRow extends Block {
    nodeType: BLOCKS.TABLE_ROW;
    data: EmptyNodeData;
    /**
     * @minItems 1
     */
    content: TableCell[];
}
export interface Table extends Block {
    nodeType: BLOCKS.TABLE;
    data: EmptyNodeData;
    /**
     * @minItems 1
     */
    content: TableRow[];
}
export {};
