import * as React from 'react';

import tokens from '@contentful/f36-tokens';
import { css } from 'emotion';
import { Badge, Button, Stack } from '@contentful/f36-components';
import { DeleteIcon } from '@contentful/f36-icons';

const styles = {
  title: css({
    marginBottom: tokens.spacing2Xs,
    marginTop: tokens.spacing2Xs,
    marginRight: tokens.spacing2Xs,
  }),
};

interface Props {
  title: string
  onDelete?: () => void;
}

export function WidgetTitle(props: Props) {
    return (
        <div contentEditable={false}>
          <Stack flex='row' justifyContent='space-between'>
            <Badge variant="primary" className={styles.title}>
                {props.title}
            </Badge>
            {props.onDelete &&
              <Button size="small" variant="transparent" onClick={props.onDelete}>
                <DeleteIcon variant="negative" />
              </Button>
            }
          </Stack>
        </div>
    );
}
