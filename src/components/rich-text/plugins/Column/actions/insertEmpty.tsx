import { BLOCKS } from "../../../rich-text-types/src";
import { insertNodes } from "../../../internal";
import { getQueryOptions, withoutNormalizing } from '@udecode/plate-common';

export function insertEmptyColumn (editor, options) {
    const width = (options == null ? 0 : options.width) || "33%";
    insertNodes(
        editor,
        {
            type: BLOCKS.COLUMN,
            children: [{ type: BLOCKS.PARAGRAPH, children: [{ text: "" }] }],
            width
        },
        getQueryOptions(editor, options)
    )
}


export function insertColumnGroup (editor) {
    withoutNormalizing(editor, () => {
        insertNodes(
            editor,
            {
                type: BLOCKS.COLUMN_GROUP,
                data: {layout: [50, 50], gap: 2},
                children: [
                    {
                      type: BLOCKS.COLUMN,
                      width: "50%",
                      children: [{ type: BLOCKS.PARAGRAPH, children: [{ text: "" }] }]
                    },
                    {
                      type: BLOCKS.COLUMN,
                      width: "50%",
                      children: [{ type: BLOCKS.PARAGRAPH, children: [{ text: "" }] }]
                    }
                  ]
            },
        )
    });
}