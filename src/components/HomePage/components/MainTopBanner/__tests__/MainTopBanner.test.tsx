import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import MainTopBanner from '../MainTopBanner';

jest.mock('../../CitySearch', () => () => <>City search input</>);

describe('MainTopBanner', () => {
  it('should match snapshot', async () => {
    const { container } = render(<MainTopBanner />);
    expect(container).toMatchSnapshot();
  });
});
