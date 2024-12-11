import * as React from 'react';

import { FieldAppSDK } from '@contentful/app-sdk';
import { EntityProvider } from '@contentful/field-editor-reference';
import { FieldConnector } from '@contentful/field-editor-shared';
import { PlateContent, Plate, PlatePlugin } from '@udecode/plate-common';
import { css, cx } from 'emotion';
import deepEquals from 'fast-deep-equal';
import noop from 'lodash/noop';

import { ContentfulEditorIdProvider, getContentfulEditorId } from './ContentfulEditorProvider';
import { toSlateValue } from './helpers/toSlateValue';
import { normalizeInitialValue } from './internal/misc';
import { getPlugins, disableCorePlugins } from './plugins';
import { RichTextTrackingActionHandler } from './plugins/Tracking';
import * as Contentful from './rich-text-types/src';
import { styles } from './RichTextEditor.styles';
import { SdkProvider } from './SdkProvider';
import { SyncEditorChanges } from './SyncEditorChanges';
import Toolbar from './Toolbar';
import StickyToolbarWrapper from './Toolbar/components/StickyToolbarWrapper';

type RichTextProps = {
  sdk: FieldAppSDK;
  isInitiallyDisabled: boolean;
  onAction?: RichTextTrackingActionHandler;
  restrictedMarks?: string[];
  // For passing down to connected editor, some refactoring needed
  minHeight?: string | number;
  maxHeight?: string | number;
  value?: Contentful.Document;
  isDisabled?: boolean;
  isToolbarHidden?: boolean;
  actionsDisabled?: boolean;
  /**
   * @deprecated Use `sdk.field.onValueChanged` instead
   */
  onChange?: (doc: Contentful.Document) => unknown;
};

type ConnectedRichTextProps = {
  sdk: FieldAppSDK;
  onAction?: RichTextTrackingActionHandler;
  onChange?: (doc: Contentful.Document) => unknown;
  restrictedMarks?: string[];
  restrictedBlocks?: string[];
  minHeight?: string | number;
  maxHeight?: string | number;
  value?: Contentful.Document;
  isDisabled?: boolean;
  isToolbarHidden?: boolean;
  actionsDisabled?: boolean;
};

export const ConnectedRichTextEditor = (props: ConnectedRichTextProps) => {
  const { sdk, onAction, restrictedMarks, restrictedBlocks } = props;

  const id = getContentfulEditorId(sdk);
  const plugins = React.useMemo(
    () => getPlugins(sdk, onAction ?? noop, restrictedMarks),
    [sdk, onAction, restrictedMarks]
  );

  const initialValue = React.useMemo(() => {
    return normalizeInitialValue(
      {
        plugins,
        disableCorePlugins,
      },
      toSlateValue(props.value)
    );
  }, [props.value, plugins]);

  // Force text direction based on editor locale
  const direction = sdk.locales.direction[sdk.field.locale] ?? 'ltr';

  const classNames = cx(
    styles.editor,
    props.minHeight !== undefined ? css({ minHeight: props.minHeight }) : undefined,
    props.maxHeight !== undefined ? css({ maxHeight: props.maxHeight }) : undefined,
    props.isDisabled ? styles.disabled : styles.enabled,
    props.isToolbarHidden && styles.hiddenToolbar,
    direction === 'rtl' ? styles.rtl : styles.ltr
  );

  return (
    <EntityProvider sdk={sdk}>
      <SdkProvider sdk={sdk}>
        <ContentfulEditorIdProvider value={id}>
          <div className={styles.root} data-test-id="rich-text-editor">
            <Plate
              id={id}
              initialValue={initialValue}
              plugins={plugins as PlatePlugin[]}
              disableCorePlugins={disableCorePlugins}
            >
              {!props.isToolbarHidden && (
                <StickyToolbarWrapper isDisabled={props.isDisabled}>
                  <Toolbar isDisabled={props.isDisabled} restrictedBlocks={restrictedBlocks}/>
                </StickyToolbarWrapper>
              )}
              <SyncEditorChanges incomingValue={initialValue} onChange={props.onChange} />
              <PlateContent id={id} className={classNames} readOnly={props.isDisabled} />
            </Plate>
          </div>
        </ContentfulEditorIdProvider>
      </SdkProvider>
    </EntityProvider>
  );
};

const RichTextEditor = (props: RichTextProps) => {
  const { sdk, isInitiallyDisabled, onAction, restrictedMarks, onChange, ...otherProps } = props;
  const isEmptyValue = React.useCallback(
    (value) => !value || deepEquals(value, Contentful.EMPTY_DOCUMENT),
    []
  );

  React.useEffect(() =>
    sdk.window.startAutoResizer()
  , [sdk.window]);

  React.useEffect(() => {
    if (!onChange) {
      return;
    }
    return sdk.field.onValueChanged(onChange);
  }, [onChange, sdk.field]);

  const id = getContentfulEditorId(props.sdk);
  return (
    <FieldConnector
      debounce={0}
      field={sdk.field}
      isInitiallyDisabled={isInitiallyDisabled}
      isEmptyValue={isEmptyValue}
    >
      {({ lastRemoteValue, disabled, setValue }) => (
        <ConnectedRichTextEditor
          {...otherProps}
          key={`rich-text-editor-${id}`}
          value={lastRemoteValue}
          sdk={sdk}
          onAction={onAction}
          isDisabled={disabled}
          onChange={(doc: Contentful.Document) => {
            setValue(doc);

            // To maintain references features in Contentful
            // we need to add entries and assets referenced in the json to
            // referenced fields (two reference field is needed used for all custom JSON fields).
            if (!sdk.entry.fields.richTextReferencesAssets) {
              throw Error(`Using the custom rich text editor requires the additional
                hidden field richTextReferencesAssets be created in this content type`);
            }

            if (!sdk.entry.fields.richTextReferencesEntries)  {
              throw Error(`Using the custom rich text editor requires the additional
                hidden field richTextReferencesEntries be created in this content type`);
            }

            let assetReferences: SysLink[] = [];
            let entryReferences: SysLink[] = [];

            // Gather all references in custom JSON fields in this same entry
            for (const fieldName in sdk.entry.fields) {
              if (Object.prototype.hasOwnProperty.call(sdk.entry.fields, fieldName)) {
                const field = sdk.entry.fields[fieldName];

                // If field is the current or is not a json object ignore it or it doesn't support this locale
                if (fieldName != sdk.field.id && field.type == 'Object' && field.locales.includes(sdk.field.locale)) {
                  assetReferences = assetReferences.concat(findSysLink(field.getValue(sdk.field.locale), 'Asset'));
                  entryReferences = entryReferences.concat(findSysLink(field.getValue(sdk.field.locale), 'Entry'));
                }
              }
            }

            // Do the same for the current field content
            assetReferences = assetReferences.concat(findSysLink(doc.content, 'Asset'));
            entryReferences = entryReferences.concat(findSysLink(doc.content, 'Entry'));

            // Store the references
            sdk.entry.fields.richTextReferencesAssets?.setValue(
              deduplicateSysLinks(assetReferences), sdk.field.locale
            );

            sdk.entry.fields.richTextReferencesEntries?.setValue(
              deduplicateSysLinks(entryReferences), sdk.field.locale
            );
          }}
          restrictedMarks={restrictedMarks}
        />
      )}
    </FieldConnector>
  );
};

/**
 * Search json to find assets and entries
 * @param jsonObj
 * @param linkType
 * @param results
 * @returns
 */
type SysLink = {
  sys: {
    id: string;
    type: string;
    linkType: string;
  };
};

function findSysLink(jsonObj: any, linkType: 'Asset' | 'Entry', results: SysLink[] = []): SysLink[] {
  // Check if the current object has the required structure
  if (jsonObj?.sys?.type === "Link" && jsonObj?.sys?.linkType === linkType) {
    results.push(jsonObj as SysLink);
  }

  // Recursively search through the properties of the current object
  for (const key in jsonObj) {
    if (jsonObj.hasOwnProperty(key) && typeof jsonObj[key] === 'object') {
      findSysLink(jsonObj[key], linkType, results);
    }
  }

  return results;
}

/**
 * Remove duplicates from a list of System Links
 * @param links
 * @returns
 */
function deduplicateSysLinks (links: SysLink[]) {
  return links.filter((value, index, self) =>
    index === self.findIndex((t) => (t.sys.id === value.sys.id))
  )
}


export default RichTextEditor;
