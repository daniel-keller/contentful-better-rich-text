import React from 'react';
import ConfigScreen from './ConfigScreen';
import { render, screen } from '@testing-library/react';
import { mockCma, mockSdk } from '../../test/mocks';

jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk(),
  useCMA: () => mockCma,
}));

describe('Config Screen component', () => {
  it('Component text exists', async () => {
    render(<ConfigScreen />);

    expect(
      screen.getByText('Newfields Seasonal Venue Hours')
    ).toBeInTheDocument();
  });
});
