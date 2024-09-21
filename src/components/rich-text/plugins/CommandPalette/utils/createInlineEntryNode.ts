import { INLINES } from '../../../inlines';

export function createInlineEntryNode(id: string) {
  return {
    type: INLINES.EMBEDDED_ENTRY,
    children: [{ text: '' }],
    data: {
      target: {
        sys: {
          id,
          type: 'Link',
          linkType: 'Entry',
        },
      },
    },
  };
}
