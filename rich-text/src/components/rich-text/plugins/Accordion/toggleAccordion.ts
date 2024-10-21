import { isBlockSelected } from '../../helpers/editor';
import { withoutNormalizing, insertNodes, unwrapNodes, isElement } from '../../internal';
import { PlateEditor } from '../../internal/types';
import { BLOCKS } from '../../rich-text-types/src';
import { TrackingPluginActions } from '../Tracking';

export function toggleAccordion(
  editor: PlateEditor,
  logAction?: TrackingPluginActions['onShortcutAction'] | TrackingPluginActions['onToolbarAction']
): void {
  if (!editor.selection) return;

  const isTitleActive = isBlockSelected(editor, BLOCKS.ACCORDION_TITLE);
  const isAccordionActive = isBlockSelected(editor, BLOCKS.ACCORDION);

  logAction?.(isTitleActive || isAccordionActive ? 'removeAccordion' : 'insertAccordion', { nodeType: BLOCKS.ACCORDION });

  withoutNormalizing(editor, () => {
    if (!editor.selection) return;

    unwrapNodes(editor, {
      match: (node) => isElement(node) && node.type === BLOCKS.ACCORDION,
      split: false
    });

    if (!isTitleActive && !isAccordionActive) {
      const accordion = {
        type: BLOCKS.ACCORDION,
        data: {},
        children: [
          {
            type: BLOCKS.ACCORDION_TITLE,
            children: [{ text: 'Untitled' }],
          },
          {
            type: BLOCKS.PARAGRAPH,
            children: [{ text: '' }],
          }
        ],
      };

      insertNodes(editor, accordion);
    }
  });
}
