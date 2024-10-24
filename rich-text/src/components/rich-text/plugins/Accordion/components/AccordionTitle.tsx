import * as React from 'react';

import { ChevronDownIcon, DeleteIcon } from '@contentful/f36-icons';
import { css } from 'emotion';

import { findNodePath, removeNodes, RenderElementProps } from '../../../internal';
import { WidgetTitle } from '../../shared/WidgetTitle';
import { Button, Stack } from '@contentful/f36-components';
import { useContentfulEditor } from '../../../ContentfulEditorProvider';
import { BLOCKS } from '../../../rich-text-types/src';
import { useElement } from '@udecode/plate-common';

const title = css({
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '2px solid darkgrey'
});

export default function AccordionTitle(props: RenderElementProps) {
  const editor = useContentfulEditor();
  const accordionElement = useElement(BLOCKS.ACCORDION);

  /**
   * Delete Accordion
   */
  const deleteAccordion = React.useCallback(() => {
    const path = findNodePath(editor, accordionElement);
    removeNodes(editor, {at: path});
  }, [editor, accordionElement]);


  return (
    <div {...props.attributes}>
      <Stack flex='row' justifyContent='space-between'>
        <WidgetTitle title='Accordion'/>
        <Button size="small" variant="transparent" onClick={deleteAccordion}>
          <DeleteIcon variant="negative" />
        </Button>
      </Stack>
      <div className={title}>
        <div className={css`width: 100%`}>{props.children}</div>
        <div contentEditable={false}><ChevronDownIcon/></div>
      </div>
    </div>
  );
}
