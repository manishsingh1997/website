import React from 'react';

import '@testing-library/jest-dom';
import {googleIntegration} from '@ergeon/core-components';
import {act, render, waitForElementToBeRemoved} from '@testing-library/react';

import * as API from '../../../api/map';
import StaffMap from '../StaffMap';
import mapData from '../__mock__/mapData';

describe('Render StaffMap component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render loading component', () => {
    const {container} = render(<StaffMap />);
    expect(container.querySelector('.loader-placeholder')).toBeInTheDocument();
  });
  it('should render without loading component', async () => {
    const {container} = render(<StaffMap />);
    const loader = container.querySelector('.loader-placeholder');
    await waitForElementToBeRemoved(loader);
    expect(loader).not.toBeInTheDocument();
  });

  it('should render with data', async () => {
    jest.spyOn(googleIntegration, 'initGoogleLoader').mockImplementation(jest.fn);
    jest.spyOn(googleIntegration, 'getGoogleLoader').mockImplementation(jest.fn);
    googleIntegration.initGoogleLoader('key', 'lib');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    jest.spyOn(API, 'getMapData').mockImplementation((_gid) => {
      return Promise.resolve({
        data: mapData,
        status: 200,
        statusText: 'OK',
        headers: '',
        config: {},
      });
    });

    const {container} = render(<StaffMap />);
    const loader = container.querySelector('.loader-placeholder');
    await act(() => {
      waitForElementToBeRemoved(loader);
    });

    const wrapper = container.querySelector('.staff-map');
    act(() => {
      expect(wrapper).toBeInTheDocument();
    });
  });
});
