import React from 'react';
import { css } from 'emotion';
import { withRef } from '@udecode/react-utils';
import type { TColumnElement } from '@udecode/plate-layout';

import { PlateElement, useElement, withHOC } from '@udecode/plate-common';
import { ResizableProvider } from '@udecode/plate-resizable';

const styles = {
  element: css`
    padding: .375rem;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 2px dashed darkgray !important;
  `
};

export const ColumnElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(({ children, ...props }, ref) => {
    const { width } = useElement<TColumnElement>();

    return (
      <PlateElement
        ref={ref}
        style={{ width }}
        {...props}
      >
        <div className={styles.element}>
          {children}
        </div>
      </PlateElement>
    );
  })
);
