import React from 'react';
import {act, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {MemoryRouter} from 'react-router-dom';
import faker from '@faker-js/faker';

import cities from '../data/cities-full-data.json';

import {AppCityPageProps} from '../components/AppCityPage/AppCityPage';
import AppCityPage from './AppCityPage';

jest.mock('../components/AppCityPage', () => ({city}: AppCityPageProps) => <>{city.slug}</>);

describe('AppCityPage container', () => {
  it('should show city', async () => {
    const citySlug = cities[0].slug;

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/fences/cities/${citySlug}`]}>
          <AppCityPage />
        </MemoryRouter>
      );
      expect(
        screen.getByTestId('loader-image')
      ).toBeInTheDocument();
      expect(
        await screen.findByText(citySlug)
      ).toBeInTheDocument();
    });
  });

  it('should show error for non existing city', async () => {
    const consoleErrorMock = jest.spyOn(global.console, 'error').mockImplementation();

    const citySlug = faker.lorem.slug();

    await act(async () => {
      render(
        <ErrorBoundary FallbackComponent={({error}) => <>{error.message}</>}>
          <MemoryRouter initialEntries={[`/fences/cities/${citySlug}`]}>
            <AppCityPage />
          </MemoryRouter>
        </ErrorBoundary>
      );
      expect(
        await screen.findByText(`Failed to import non-existing "data/city/${citySlug}.json"`)
      ).toBeInTheDocument();
    });

    consoleErrorMock.mockRestore();
  });
});
