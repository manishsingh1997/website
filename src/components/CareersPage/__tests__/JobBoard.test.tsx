import React from 'react';
import {render, waitForElementToBeRemoved} from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';

import JobBoard from '../JobBoard/index';

import jobList from '../__mock__/jobList';

jest.mock('axios');

describe('Render JobBoard', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render with loading', () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        departments: jobList,
      },
    });
    const {container} = render(<JobBoard />);
    expect(container.querySelector('.blue.loader')).toBeInTheDocument();
  });
  it('should render without loading', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        departments: jobList,
      },
    });
    const {container} = render(<JobBoard />);
    const loader = container.querySelector('.blue.loader');
    await waitForElementToBeRemoved(loader);
  });
  it('should render with data', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        departments: jobList,
      },
    });
    const {container} = render(<JobBoard />);
    const loader = container.querySelector('.blue.loader');
    await waitForElementToBeRemoved(loader);
    const items = container.querySelectorAll('.job-list__job');
    expect(items).toHaveLength(9);
  });
  it('should render without data', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        departments: [],
      },
    });
    const {container} = render(<JobBoard />);
    const loader = container.querySelector('.blue.loader');
    await waitForElementToBeRemoved(loader);
    const items = container.querySelectorAll('.job-list__job');
    expect(items).toHaveLength(0);
  });
});
