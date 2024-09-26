import { BLOCKS } from "../../../rich-text-types/src";
import { isElement, getLastChildPath, createPathRef} from "../../../internal";
import { insertEmptyColumn } from './insertEmpty';
import { moveMiddleColumn } from './moveMiddleColumn';
import { setColumnWidth } from './setColumnWidth';

export function normalizeColumn (editor) {
    const { normalizeNode } = editor;

    return function(entry) {
        if (isElement(entry[0]) && entry[0].type === BLOCKS.COLUMN_GROUP) {
          return normalizeColumnHelper(
            editor,
            entry
          );
        }
        return normalizeNode(entry);
    };

}

const normalizeColumnHelper = (editor, entry) => {
    const [node, path] = entry;
    const prevChildrenCnt = node.children.length;
    const currentLayout = node.data.layout;
    if (!currentLayout)
      return;
    const currentChildrenCnt = currentLayout.length;
    const groupPathRef = createPathRef(editor, path);
    if (prevChildrenCnt === 2 && currentChildrenCnt === 3) {
      const lastChildPath = getLastChildPath(entry);
      insertEmptyColumn(editor, {
        at: lastChildPath
      });
      setColumnWidth(editor, groupPathRef, currentLayout);
    }
    if (prevChildrenCnt === 3 && currentChildrenCnt === 2) {
      moveMiddleColumn(editor, entry, { direction: "left" });
      setColumnWidth(editor, groupPathRef, currentLayout);
    }
    if (prevChildrenCnt === currentChildrenCnt) {
      setColumnWidth(editor, groupPathRef, currentLayout);
    }
};
