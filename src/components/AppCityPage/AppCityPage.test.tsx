import React from 'react';
import {render} from '@testing-library/react';
import cities from '../../data/cities-full-data.json';
import AppCityPage from './AppCityPage';
import {City} from './types';
import {getAsset} from './utils';

jest.mock('../HomePage/QASection', () => () => <>FAQ</>);
jest.mock('../NotFoundPage', () => () => <>Not found</>);
jest.mock('../../containers/TellUsForm', () => () => <>Tell Us Form</>);

describe('AppCityPage', () => {
  it('should render', () => {
    const {container, getAllByTestId} = render(
      <AppCityPage city={cities[0] as unknown as City} />
    );

    const images = getAllByTestId('test-image');
    const image = images[0] as HTMLImageElement;
    expect(container).toMatchSnapshot();
    expect(images).toHaveLength(10);
    expect(image.src).toBe(getAsset(cities[0].packages.data.wood[0].img, 'jpeg'));
  });
});
