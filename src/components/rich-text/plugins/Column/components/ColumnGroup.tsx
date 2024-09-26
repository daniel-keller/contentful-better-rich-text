import React from 'react';
import { css } from 'emotion';
import type { TColumnElement } from '@udecode/plate-layout';
import { withRef } from '@udecode/react-utils';
import {
  PlateElement,
  useElement,
} from '@udecode/plate-common';

import { BLOCKS } from '../../../rich-text-types/src';
import { useColumnState } from '../actions/useColumnState';
import { useDebouncePopoverOpen } from '../actions/useDebouncePopoverOpen';

import { Menu, Button, Popover } from '@contentful/f36-components';
import { DeleteIcon, ChevronDownIcon } from '@contentful/f36-icons';
import { removeNodes, findNodePath, Element } from '../../../internal';
import { useContentfulEditor, useContentfulEditorRef } from '../../../ContentfulEditorProvider';
import { getElementFromCurrentSelection } from '../../../helpers/editor';

const styles = {
  itemButton: css({
    minWidth: 'unset',
  }),
  menuButton: css`
    padding-left: 5px;
    padding-right: 5px;
    span {
      display: flex;
      align-content: center;
      align-items: center;
    };
  `
};

export const ColumnGroupElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    const data: any = props.element.data;
    const spacing = data?.gap ? 0.5 * data.gap : 0.5;

    const group = css`
      display: flex;
      width: 100%;
      height: 100%;
      gap: ${spacing}em;
      margin-top: .5rem;
      margin-bottom: ${spacing}em;
    `;


    return (
      <PlateElement ref={ref} {...props}>
        <ColumnFloatingToolbar>
          <div className={group}>
            {children}
          </div>
        </ColumnFloatingToolbar>
      </PlateElement>
    );
  }
);

const useRemoveNodeButton = ({ element }) => {
  const editor = useContentfulEditorRef();
  return {
    props: {
      onMouseDown: (e) => {
        e.preventDefault();
      },
      onClick: () => {
        const path = findNodePath(editor, element);
        console.log(path);
        removeNodes(editor, { at: path });
      }
    }
  };
};


export function ColumnFloatingToolbar({ children }: {children: React.ReactNode}) {
  const gaps = [1, 2, 3, 4];
  const editor = useContentfulEditor();
  const [isGapOpen, setGapOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<number>(gaps[1]);

  React.useEffect(() => {
    if (!editor?.selection) return;

    const elements = getElementFromCurrentSelection(editor);

    // Iterate through the elements to identify matches
    // In lists it would otherwise never show the correct block.
    for (const element of elements) {
      if (typeof element === 'object' && 'type' in element) {
        const el = element as Element;

        if (el.data?.gap) {
          return setSelected(el.data?.gap as number);
        }
      }
    }

    setSelected(gaps[1]);
  }, [editor?.operations, editor?.selection]);

  const {
    setDoubleColumn,
    setDoubleSideDoubleColumn,
    setLeftSideDoubleColumn,
    setRightSideDoubleColumn,
    setThreeColumn,
    setGap,
  } = useColumnState();

  const element = useElement<TColumnElement>(BLOCKS.COLUMN);
  const { props: buttonProps } = useRemoveNodeButton({ element });

  function handleOnSelectItem(gap: number): (event: React.MouseEvent<HTMLButtonElement>) => void {
    return () => {
      setSelected(gap);
      setGap(gap);
    }
  }

  const isOpen = useDebouncePopoverOpen();

  return (
    <Popover isOpen={isOpen} autoFocus={false} placement='top'>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content>
        <div>
          <Button size="small" variant="transparent" onClick={setDoubleColumn}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16"><path clip-rule="evenodd" d="M8.5 3H13V13H8.5V3ZM7.5 2H8.5H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H8.5H7.5H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H7.5ZM7.5 13H3L3 3H7.5V13Z" fill="#000" fill-rule="evenodd"></path></svg>
          </Button>
          <Button size="small" variant="transparent" onClick={setThreeColumn}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16"><path clip-rule="evenodd" d="M9.25 3H6.75V13H9.25V3ZM9.25 2H6.75H5.75H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H5.75H6.75H9.25H10.25H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2H10.25H9.25ZM10.25 3V13H13V3H10.25ZM3 13H5.75V3H3L3 13Z" fill="#000" fill-rule="evenodd"></path></svg>
          </Button>
          <Button size="small" variant="transparent" onClick={setRightSideDoubleColumn}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16"><path clip-rule="evenodd" d="M11.25 3H13V13H11.25V3ZM10.25 2H11.25H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H11.25H10.25H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H10.25ZM10.25 13H3L3 3H10.25V13Z" fill="#000" fill-rule="evenodd"></path></svg>
          </Button>
          <Button size="small" variant="transparent" onClick={setLeftSideDoubleColumn}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16"><path clip-rule="evenodd" d="M5.75 3H13V13H5.75V3ZM4.75 2H5.75H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H5.75H4.75H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H4.75ZM4.75 13H3L3 3H4.75V13Z" fill="#000" fill-rule="evenodd"></path></svg>
          </Button>
          <Button
            size="small"
            variant="transparent"
            onClick={setDoubleSideDoubleColumn}
          >
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16"><path clip-rule="evenodd" d="M10.25 3H5.75V13H10.25V3ZM10.25 2H5.75H4.75H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H4.75H5.75H10.25H11.25H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2H11.25H10.25ZM11.25 3V13H13V3H11.25ZM3 13H4.75V3H3L3 13Z" fill="#000" fill-rule="evenodd"></path></svg>
          </Button>

          <Menu isOpen={isGapOpen} onClose={() => setGapOpen(false)}>
            <Menu.Trigger>
              <Button
                size="small"
                variant="transparent"
                endIcon={<ChevronDownIcon />}
                onClick={() => setGapOpen(!isGapOpen)}
                className={styles.menuButton}
              >
                <span>
                  <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                    <path d="M6 12H18M6 12L8 9M6 12L8 15M18 12L16 9M18 12L16 15M21 21V3M3 21V3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {selected}
                </span>
              </Button>
            </Menu.Trigger>
            <Menu.List>
              {gaps.map((gap) =>
                <Menu.Item
                  key={gap}
                  isInitiallyFocused={gap == gaps[1]}
                  onClick={handleOnSelectItem(gap)}
                  className={styles.itemButton}
                >
                  {gap}
                </Menu.Item>
              )}
            </Menu.List>
          </Menu>

          <Button size="small" variant="transparent" {...buttonProps}>
            <DeleteIcon variant='negative'/>
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
}
