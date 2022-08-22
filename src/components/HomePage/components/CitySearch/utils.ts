import { CITIES_PAGE_PATH } from '../../../../website/constants';

import { CitiesJSONData } from './types';

enum SupportedStates {
  California = 'CA',
  CaliforniaRedirect = 'San Jose',
  Texas = 'TX',
  TexasRedirect = 'Dallas',
  Georgia = 'GA',
  GeorgiaRedirect = 'Atlanta',
}

// we also need to match the correct State otherwise we might get wrong results
export const getExistingCitySlug = (city: string | undefined, state: string, citiesData: CitiesJSONData | null) => {
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
    case SupportedStates.California:
      return citiesData?.cities.find(c => c.city === SupportedStates.CaliforniaRedirect)?.slug;
    case SupportedStates.Texas:
      return citiesData?.cities.find(c => c.city === SupportedStates.TexasRedirect)?.slug;
    case SupportedStates.Georgia:
      return citiesData?.cities.find(c => c.city === SupportedStates.GeorgiaRedirect)?.slug;
    default: {
      const exhaustiveCheck = state as never;
      throw new Error(`Cannot find city for state: "${exhaustiveCheck}"`);
    }
  }
};

export const getCityPath = (citySlug: string) => `${CITIES_PAGE_PATH}/${citySlug}`;
