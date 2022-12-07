import { CITIES_PAGE_PATH } from '../../../../website/constants';

import { CitiesJSONData } from './types';

export enum SupportedState {
  California = 'CA',
  Texas = 'TX',
  Georgia = 'GA',
}

enum Redirect {
  California = 'San Jose',
  Texas = 'Dallas',
  Georgia = 'Atlanta',
}

// we also need to match the correct State otherwise we might get wrong results
export const getExistingCitySlug = (
  city: string | undefined,
  state: SupportedState,
  citiesData: CitiesJSONData | null,
) => {
  // License in DC is not yet verified,
  // So we need to hide the page(ENG-18124)
  if ((state as never) === 'DC') {
    throw new Error('Cannot find city for state: DC');
  }

  const cityPage = citiesData?.cities.find(c => c.city === city && c.state === state);
  if (cityPage) {
    return cityPage.slug;
  }
  const neighboringCityPage = citiesData?.neighboring.find(c => c.city === city && c.state === state);
  if (neighboringCityPage) {
    return neighboringCityPage?.to_slug;
  }
  // in case the city doesn't have a page we redirect to the default state one
  switch (state) {
    case SupportedState.California:
      return citiesData?.cities.find(c => c.city === Redirect.California)?.slug;
    case SupportedState.Texas:
      return citiesData?.cities.find(c => c.city === Redirect.Texas)?.slug;
    case SupportedState.Georgia:
      return citiesData?.cities.find(c => c.city === Redirect.Georgia)?.slug;
    default: {
      const exhaustiveCheck: never = state;
      throw new Error(`Cannot find city for state: "${exhaustiveCheck}"`);
    }
  }
};

export const getCityPath = (citySlug: string) => `${CITIES_PAGE_PATH}/${citySlug}`;
