import { writeFile } from 'fs';
import { resolve } from 'path';
import * as TJS from 'typescript-json-schema';

import { BLOCKS, INLINES } from '../src/index';

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  topRef: true,
  noExtraProps: true,
  required: true,
  typeOfKeyword: true,
  constAsEnum: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
  // composite: true,
  lib: ['es2015', 'es2016', 'es2017', 'dom'],
};

const program = TJS.getProgramFromFiles(
  [resolve(__dirname, '../src/types.ts'), resolve(__dirname, '../src/nodeTypes.ts')],
  compilerOptions
);

const createJsonSchema = (symbolName: string, nodeType: string): void => {
  const doc = TJS.generateSchema(program, symbolName, settings);

  const schemaString = JSON.stringify(doc, null, 2);

  writeFile(
    resolve(__dirname, `../src/schemas/generated/${nodeType}.json`),
    schemaString,
    (err) => {
      if (err) {
        return console.log(err);
      }
    }
  );
};

const blockSymbolsMap = new Map([
  [BLOCKS.DOCUMENT, 'Document'],
  [BLOCKS.PARAGRAPH, 'Paragraph'],
  [BLOCKS.HEADING_1, 'Heading1'],
  [BLOCKS.HEADING_2, 'Heading2'],
  [BLOCKS.HEADING_3, 'Heading3'],
  [BLOCKS.HEADING_4, 'Heading4'],
  [BLOCKS.HEADING_5, 'Heading5'],
  [BLOCKS.HEADING_6, 'Heading6'],
  [BLOCKS.OL_LIST, 'OrderedList'],
  [BLOCKS.UL_LIST, 'UnorderedList'],
  [BLOCKS.LIST_ITEM, 'ListItem'],
  [BLOCKS.HR, 'Hr'],
  [BLOCKS.QUOTE, 'Quote'],
  [BLOCKS.EMBEDDED_ENTRY, 'EntryLinkBlock'],
  [BLOCKS.EMBEDDED_ASSET, 'AssetLinkBlock'],
  [BLOCKS.EMBEDDED_RESOURCE, 'ResourceLinkBlock'],
  [BLOCKS.TABLE, 'Table'],
  [BLOCKS.TABLE_ROW, 'TableRow'],
  [BLOCKS.TABLE_CELL, 'TableCell'],
  [BLOCKS.TABLE_HEADER_CELL, 'TableHeaderCell'],
  // Custom
  [BLOCKS.ACCORDION, 'Accordion'],
  [BLOCKS.ACCORDION_TITLE, 'AccordionTitle'],
  [BLOCKS.ACCORDION_BODY, 'AccordionBody'],
  [BLOCKS.COLUMN_GROUP, 'ColumnGroup'],
  [BLOCKS.COLUMN, 'Column'],
  [BLOCKS.FILLOUT_FORM, 'FilloutForm'],
  [BLOCKS.IFRAME, 'IFrame'],
  [BLOCKS.ASSET_GALLERY, 'AssetGallery'],
]);

const inlineSymbolsMap = new Map([
  [INLINES.HYPERLINK, 'Hyperlink'],
  [INLINES.ENTRY_HYPERLINK, 'EntryHyperlink'],
  [INLINES.ASSET_HYPERLINK, 'AssetHyperlink'],
  [INLINES.RESOURCE_HYPERLINK, 'ResourceHyperlink'],
  [INLINES.EMBEDDED_ENTRY, 'EntryLinkInline'],
  [INLINES.EMBEDDED_ASSET, 'AssetLinkInline'],
  [INLINES.EMBEDDED_RESOURCE, 'ResourceLinkInline'],
]);

Object.values(BLOCKS).forEach((nodeType) => {
  const symbolName = blockSymbolsMap.get(nodeType);
  createJsonSchema(symbolName as string, nodeType);
});

Object.values(INLINES).forEach((nodeType) => {
  const symbolName = inlineSymbolsMap.get(nodeType);
  createJsonSchema(symbolName as string, nodeType);
});

createJsonSchema('Text', 'text');
