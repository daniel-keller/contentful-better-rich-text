import * as React from 'react';

import { ChevronDownIcon } from '@contentful/f36-icons';
import { css } from 'emotion';

import { RenderElementProps } from '../../../internal';
import { WidgetTitle } from '../../shared/WidgetTitle';


const title = css({
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '2px solid darkgrey'
});


export default function AccordionTitle(props: RenderElementProps) {
  return (
    <div {...props.attributes}>
      <WidgetTitle title='Accordion'/>
      <div className={title}>
        <div className={css`width: 100%`}>{props.children}</div>
        <div contentEditable={false}><ChevronDownIcon/></div>
      </div>
    </div>
  );
}