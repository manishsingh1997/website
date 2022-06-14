import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { CitySearchInput, PlacesAutocompleteTypes } from '@ergeon/core-components';
import { useCitiesJSONData } from './customHooks';

const CitySearch = () => {
  const history = useHistory();
  const { citiesData, isLoading, error: citiesDataError } = useCitiesJSONData();
  const [error, setError] = useState<string | null>(citiesDataError);

  // we also need to match the correct State otherwise we might get wrong results
  const doesCityPageExists = useCallback((city: string | undefined, state: string) => {
    const cityPage = citiesData?.cities.find(c => c.city === city && c.state === state);
    if (cityPage) {
      return cityPage.slug;
    }
    const neighboringCityPage = citiesData?.neighboring.find(c => c.city === city && c.state === state);
    return neighboringCityPage?.to_slug;
  }, [citiesData]);

  const goToCityPage = useCallback((citySlug: string) => {
    history.push(`/fences/cities/${citySlug}`);
  }, []);

  const handleSubmit = useCallback(async (placeData: PlacesAutocompleteTypes.AutoCompletePlaceData) => {
    const { city_name, state_abbreviation } = placeData;
    setError(null);
    const citySlug = doesCityPageExists(city_name, state_abbreviation);
    if (citySlug) {
      goToCityPage(citySlug);
      return;
    }
    // seems we don't support that city :(
    setError('This city is not supported');
  }, [citiesData, goToCityPage]);

  return (
    <CitySearchInput
      error={error}
      handleButtonClick={handleSubmit}
      isLoading={isLoading}
    />
  );
}

export default CitySearch;
