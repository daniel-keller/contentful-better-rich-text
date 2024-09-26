import { BLOCKS } from '../../rich-text-types/src';
import {
  createColumnPlugin as createDefaultColumnPlugin,
  ELEMENT_COLUMN,
  ELEMENT_COLUMN_GROUP,
} from '@udecode/plate-layout';

import { getAboveNode, isElement, PlatePlugin } from '../../internal';
import { ColumnGroupElement } from './components/ColumnGroup';
import { ColumnElement } from './components/ColumnElement';
import { normalizeColumn } from './actions/normalizeColumn';
import { isCollapsed, isStartPoint } from '@udecode/plate-common';
import { onKeyDownColumn } from './actions';

export const createColumnPlugin = (): PlatePlugin =>
  createDefaultColumnPlugin({
    type: BLOCKS.COLUMN_GROUP,
    handlers: {
      onKeyDown: onKeyDownColumn
    },
    withOverrides: (editor) => {
      const { deleteBackward, isEmpty } = editor;
      editor.normalizeNode = normalizeColumn(editor);

      editor.deleteBackward = (unit) => {
        if (isCollapsed(editor.selection)) {
          const entry = getAboveNode(editor, {
            match: (n) => isElement(n) && n.type === BLOCKS.COLUMN
          });

          if (entry) {
            const [node, path] = entry;
            if (Array.isArray(node.children) && node.children.length > 1) return deleteBackward(unit);

            const isStart = isStartPoint(editor, editor.selection == null ? undefined : editor.selection.anchor, path);
            if (isStart) return;
          }
        }

        deleteBackward(unit);
      };

      editor.isEmpty = (element: any) => {
        if (element?.type === BLOCKS.COLUMN) {
          return element.children.length === 1 && isEmpty(element.children[0]);
        }
        return isEmpty(element);
      };
      return editor;
    },
    overrideByKey: {
      [ELEMENT_COLUMN]: {
        type: BLOCKS.COLUMN,
        component: ColumnElement
      },
      [ELEMENT_COLUMN_GROUP]: {
        type: BLOCKS.COLUMN_GROUP,
        component: ColumnGroupElement
      }
    }
  });






//   import { BLOCKS } from '../../rich-text-types/src';
// import { getAboveNode, isElement, PlatePlugin } from '../../internal';
// import { ColumnGroupElement } from './components/ColumnGroup';
// // import { ColumnElement } from './components/ColumnElement';
// import { normalizeColumn } from './actions/normalizeColumn';
// import { isCollapsed, isStartPoint } from '@udecode/plate-common';

// export const createColumnPlugin = (): PlatePlugin => ({
//     key: BLOCKS.COLUMN_GROUP,
//     type: BLOCKS.COLUMN_GROUP,
//     component: ColumnGroupElement,
//     withOverrides: (editor) => {
//       const { deleteBackward, isEmpty } = editor;
//       editor.normalizeNode = normalizeColumn(editor);

//       editor.deleteBackward = (unit) => {
//         var _a;

//         if (isCollapsed(editor.selection)) {
//           const entry = getAboveNode(editor, {
//             match: (n) => isElement(n) && n.type === BLOCKS.COLUMN
//           });

//           if (entry) {
//             const [node, path] = entry;
//             if (Array.isArray(node.children) && node.children.length > 1) return deleteBackward(unit);

//             const isStart = isStartPoint(editor, (_a = editor.selection) == null ? void 0 : _a.anchor, path);
//             if (isStart) return;
//           }
//         }

//         deleteBackward(unit);
//       };

//       editor.isEmpty = (element: any) => {
//         if (element?.type === BLOCKS.COLUMN) {
//           return element.children.length === 1 && isEmpty(element.children[0]);
//         }
//         return isEmpty(element);
//       };
//       return editor;
//     },
//     // components: {
//     //   [ELEMENT_COLUMN]: {
//     //     type: BLOCKS.COLUMN,
//     //     component: ColumnElement
//     //   },
//     //   [ELEMENT_COLUMN_GROUP]: {
//     //     type: BLOCKS.COLUMN_GROUP,
//     //     component: ColumnGroupElement
//     //   }
//     // }
//   });