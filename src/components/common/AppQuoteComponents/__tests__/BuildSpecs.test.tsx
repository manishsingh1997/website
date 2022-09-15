import React from 'react';

import '@testing-library/jest-dom';

import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {store} from '../../../__mocks__/mockStore';
import BuildSpecs from '../BuildSpecs';

describe('BuildSpecs test', () => {
  it('Should render BuildSpecs', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['config/?configID=1']}>
          <BuildSpecs/>
        </MemoryRouter>
      </Provider>
    );
    const buildSpec = screen.getAllByText('Build Specifications');
    expect(buildSpec).toBeDefined();
  });
});
