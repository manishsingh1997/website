import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import cities from '../../data/cities-full-data.json';
import AppCityPage from './AppCityPage';
import {City} from './types';
import {getAsset} from './utils';
import CityBanner from './CityBanner';
import MainBanner from './MainBanner';

jest.mock('../HomePage/QASection', () => () => <>FAQ</>);
jest.mock('../NotFoundPage', () => () => <>Not found</>);
jest.mock('../../containers/TellUsForm', () => () => <>Tell Us Form</>);

const CITY_BANNER_PHONE = '(543) 094 5738';

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

  it('Should render city banner', () => {
    const city = 'Coruscant';
    render(<CityBanner city={city} phone={CITY_BANNER_PHONE}/>);

    const cityName = screen.getByText(new RegExp(city, 'ig'));
    const cityBanner = screen.getByTestId(/city-banner/);
    expect(cityName).toBeInTheDocument();
    expect(cityBanner).toMatchSnapshot();
  })

  it('Should render Main city banner', () => {
    render(<MainBanner bullets={['one', 'two']} phone='+1234' state='CA' title='California' />);

    const cityBanner = screen.getByTestId(/main-banner/);
    expect(cityBanner).toMatchSnapshot();
  })
});
