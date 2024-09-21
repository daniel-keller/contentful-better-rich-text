import React, { useCallback, useState, useEffect } from 'react';
import { ConfigAppSDK } from '@contentful/app-sdk';
import {
  Paragraph,
  Flex,
  TextInput,
  Form,
  TextLink,
  Note,
} from '@contentful/f36-components';
import { css } from '@emotion/css';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

export interface AppInstallationParameters {
  cpaToken: string;
}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({
    cpaToken: ''
  });

  const sdk = useSDK<ConfigAppSDK>();

  const onInputChange = (event: any): void => {
    const target = event.target as HTMLInputElement;
    setParameters({cpaToken: target.value});
  };

  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  const onConfigure = useCallback(async () => {

    // CPA Token is required
    if (!parameters.cpaToken) {
      sdk.notifier.error("Please define the Content Preview API token.");
      return false;
    }

    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <Flex flexDirection="column" className={css({ margin: '80px', maxWidth: '800px' })}>
      <Paragraph>
        Newfields Seasonal Venue Hours
      </Paragraph>
      <Form>
        <Paragraph style={{ marginTop: "1em" }}>
          <TextLink
            href={`https://app.contentful.com/spaces/${sdk.ids.space}/api/keys`}
            target="_blank"
            rel="noopener"
          >
            Create a new pair of API keys
          </TextLink>{" "}
          and save the Content Preview API token below:
        </Paragraph>
        <TextInput
          name="cpaToken"
          id="cpaToken"
          placeholder="CPA token"
          value={parameters.cpaToken}
          onChange={onInputChange}
          isRequired
        />
        <Note>
          The CPA (Content Preview API) token allows you to also access
          preview data when using NEwfields Seasonal Venue Hours.
        </Note>
      </Form>
    </Flex>
  );
};

export default ConfigScreen;
