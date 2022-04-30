import {render, screen} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import {mockHouseA} from '../../__mocks__/mockHouses';
import HouseCard from '../HouseCard';

jest.mock('@ergeon/core-components', () => ({
  ...jest.requireActual('@ergeon/core-components'),
  googleIntegration: {getGoogleLoader: jest.fn()},
}));

describe('Should test the House Card component', () => {

  test('Should check the house number and map wrapper', () => {
    const {container} = render(
      <HouseCard house={mockHouseA} houseNumber={1}/>
    );
    const houseNumber = screen.getByText('House #1');
    expect(houseNumber).toBeInTheDocument();
    const mapWrapper = container.getElementsByClassName('map-wrapper');
    expect(mapWrapper).toBeDefined();
  });

});
