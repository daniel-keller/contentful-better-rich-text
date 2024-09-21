import * as React from 'react';

import { EntityLink } from '@contentful/field-editor-reference';
import { useReadOnly, useSelected } from 'slate-react';

import { useContentfulEditor } from '../../ContentfulEditorProvider';
import { focus } from '../../helpers/editor';
import { findNodePath } from '../../internal/queries';
import { removeNodes, setNodes } from '../../internal/transforms';
import { Element, RenderElementProps } from '../../internal/types';
import { useSdkContext } from '../../SdkProvider';
import { useLinkTracking } from '../links-tracking';
import { LinkedInlineWrapper } from '../shared/LinkedInlineWrapper';
import { FetchingWrappedInlineEntryCard } from './FetchingWrappedInlineEntryCard';
import { FetchingWrappedAssetCard } from '../shared/FetchingWrappedAssetCard';
import { css } from 'emotion';
import { ButtonGroup, Stack, ToggleButton } from '@contentful/f36-components';
import { ArrowBackwardIcon, ArrowForwardIcon } from '@contentful/f36-icons';

type LinkedEntityInlineProps = {
  element: Element & {
    data: {
      target: EntityLink;
      float?: string;
    };
  };
  attributes: Pick<RenderElementProps, 'attributes'>;
  children: React.ReactNode;
};

const styles = {
  inlineAssetRight: css({
    paddingLeft: '10px',
    float: 'right'
  }),
  inlineAssetLeft: css({
    paddingRight: '10px',
    float: 'left'
  }),
  extraSmallButtons: css({
    minHeight: 'unset',
    height: 'fit-content',
    padding: '0.15rem 0.5rem'
  })
};

function ToggleFloatButtons (
  { float, onToggle }: { float: string, onToggle: (float: string) => void}
) {
  return (
    <ButtonGroup>
      <ToggleButton
        className={styles.extraSmallButtons}
        isActive={float == 'left'}
        icon={<ArrowBackwardIcon />}
        aria-label="Float Left"
        size="small"
        onToggle={() => {
          onToggle('left');
        }}
      />
      <ToggleButton
        className={styles.extraSmallButtons}
        isActive={float == 'right'}
        icon={<ArrowForwardIcon />}
        aria-label="Float Right"
        size="small"
        onToggle={() => {
          onToggle('right');
        }}
      />
    </ButtonGroup>
  );
}

export function LinkedEntityInline(props: LinkedEntityInlineProps) {
  const { attributes, children, element } = props;
  const { onEntityFetchComplete } = useLinkTracking();
  const isSelected = useSelected();
  const editor = useContentfulEditor();
  const sdk = useSdkContext();
  const isDisabled = useReadOnly();
  const { id: entityId, linkType: entityType } = element.data.target.sys;

  const handleEditClick = React.useCallback(() => {
    const openEntity = entityType === 'Asset' ? sdk.navigator.openAsset : sdk.navigator.openEntry;
    return openEntity(entityId, { slideIn: true }).then(() => editor && focus(editor));
  }, [sdk, entityId, entityType]);


  const handleRemoveClick = React.useCallback(() => {
    if (!editor) return;
    const pathToElement = findNodePath(editor, element);
    removeNodes(editor, { at: pathToElement });
  }, [editor, element]);

  function toggleFloat(float: string) {
    if (!editor) return;
    const pathToElement = findNodePath(editor, element);
    setNodes(editor, { data: {...element.data, float: float} }, { at: pathToElement });
  }

  if (entityType === 'Entry') {
    return <LinkedInlineWrapper
        attributes={attributes}
        card={
          <FetchingWrappedInlineEntryCard
            sdk={sdk}
            entryId={entityId}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onRemove={handleRemoveClick}
            onEdit={handleEditClick}
            onEntityFetchComplete={onEntityFetchComplete}
          />
        }
        link={element.data.target}
      >
        {children}
      </LinkedInlineWrapper>
  }

  // Inline Asset
  return (
    <Stack className={
      element.data.float == 'left'
        ? styles.inlineAssetLeft
        : styles.inlineAssetRight
    } flexDirection="column" spacing='spacingXs'>
      <ToggleFloatButtons onToggle={toggleFloat} float={element.data.float ?? 'right'}/>
      <LinkedInlineWrapper
        attributes={attributes}
        card={
          <FetchingWrappedAssetCard
            sdk={sdk}
            assetId={entityId}
            locale={sdk.field.locale}
            isDisabled={isDisabled}
            isSelected={isSelected}
            onRemove={handleRemoveClick}
            onEdit={handleEditClick}
            onEntityFetchComplete={onEntityFetchComplete}
          />
        }
        link={element.data.target}
      >
        {children}
      </LinkedInlineWrapper>
    </Stack>
  );
}
