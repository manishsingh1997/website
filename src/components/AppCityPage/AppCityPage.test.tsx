import React from 'react';
import {render} from '@testing-library/react';

import cities from '../../data/cities-full-data.json';
import AppCityPage from './AppCityPage';
import {City} from './types';

jest.mock('../HomePage/QASection', () => () => <>FAQ</>);
jest.mock('../NotFoundPage', () => () => <>Not found</>);
jest.mock('../../containers/TellUsForm', () => () => <>Tell Us Form</>);

describe('AppCityPage', () => {
  it('should render', () => {
    const {container} = render(
      <AppCityPage city={cities[0] as unknown as City} />
    );
    expect(container).toMatchSnapshot();
  });
});
