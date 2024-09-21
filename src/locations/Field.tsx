import { FieldAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { RichTextEditor } from '../components/rich-text';

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();


  return (
    <div>
      <RichTextEditor isInitiallyDisabled={false} sdk={sdk}/>
    </div>
  );

};

export default Field;
