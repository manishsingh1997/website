import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import AboutPage from '../index';

describe('About page', () => {
  test('It matches snapshot on render', () => {
    const { container} = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    
    expect(container).toMatchSnapshot();
  });
});
