import { useMemo } from 'react';
import { FieldAppSDK, locations } from '@contentful/app-sdk';
import ConfigScreen from './locations/ConfigScreen';
import Field from './locations/Field';
import { useSDK } from '@contentful/react-apps-toolkit';

const ComponentLocationSettings = {
  [locations.LOCATION_APP_CONFIG]: ConfigScreen,
  [locations.LOCATION_ENTRY_FIELD]: Field,
};

const App = () => {
  const sdk = useSDK();
  (sdk as FieldAppSDK).window.startAutoResizer();

  const Component = useMemo(() => {
    for (const [location, component] of Object.entries(ComponentLocationSettings)) {
      if (sdk.location.is(location)) {
        return component;
      }
    }
  }, [sdk.location]);

  return Component ? <Component /> : null;
};

export default App;
