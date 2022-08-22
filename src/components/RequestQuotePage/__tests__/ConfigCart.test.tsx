import React from 'react';

import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ConfigCart from '../ConfigCart';
import {selectedConfigs} from '../__mocks__/mockData';

const configCartProps = {
  addConfigFromSchema: jest.fn,
  configs: selectedConfigs,
  onShowStyleBrowserChange: jest.fn,
  removeConfig: jest.fn,
  showStyleBrowser: false,
  updateConfig: jest.fn,
  zipcode: '94301',
};

describe('ConfigCart', () => {
  it('should render config cart', () => {
    render(<ConfigCart {...configCartProps} />);

    const configHeader = screen.queryByTestId('configs-header');
    expect(configHeader).toBeInTheDocument();

    // Test fence config data present in Dom
    const fence = selectedConfigs[0];
    const fenceTile = screen.queryByTestId(`config-title-${fence.id}`);
    expect(fenceTile).toHaveTextContent('Fence');

    const fencePrice = screen.queryByTestId(`config-price-${fence.id}`);
    expect(fencePrice).toHaveTextContent(`~${Math.round(Number(fence.price))}/ft`);

    const fenceDescription = screen.queryByTestId(`config-description-${fence.id}`);
    expect(fenceDescription).toHaveTextContent(fence.description);

    // Test gate config data present in Dom
    const gate = selectedConfigs[1];
    const gateTile = screen.queryByTestId(`config-title-${gate.id}`);
    expect(gateTile).toHaveTextContent('Gate');

    const gatePrice = screen.queryByTestId(`config-price-${gate.id}`);
    expect(gatePrice).toHaveTextContent(`~${Math.round(Number(gate.price))}`);

    const gateDescription = screen.queryByTestId(`config-description-${gate.id}`);
    expect(gateDescription).toHaveTextContent(gate.description);
  });
});
