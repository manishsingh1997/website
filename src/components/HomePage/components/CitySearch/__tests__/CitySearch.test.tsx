import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { initialize, mockInstances } from '@googlemaps/jest-mocks';
import '@testing-library/jest-dom';
import { googleIntegration } from '@ergeon/core-components';

import CitySearch from '../';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn((to) => `Redirect to ${to}`),
  }),
}));

describe('CitySearch component tests', () => {
  beforeAll(() => {
    initialize();
    const { initGoogleLoader, ADDRESS_INPUT_LIBRARIES } = googleIntegration;
    initGoogleLoader(
      process.env.GOOGLE_MAPS_API_KEY,
      ADDRESS_INPUT_LIBRARIES,
    );
  });

  afterAll(() => {
    mockInstances.clearAll();
  });

  it('should render without crashing', () => {
    render(<CitySearch />);

    const placeholderTxt = screen.queryByText('Enter your city');
    expect(placeholderTxt).toBeInTheDocument();
  });

  it('should allow typing city', async () => {
    render(<CitySearch />);

    const searchBtn = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    expect(input).not.toBeNull();
    expect(searchBtn).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Sacramento' } });
    expect(input).toHaveValue('Sacramento');
  });
});
