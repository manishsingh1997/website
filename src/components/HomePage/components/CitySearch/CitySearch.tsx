import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { CitySearchInput, PlacesAutocompleteTypes } from '@ergeon/core-components';
import { useCitiesJSONData } from './customHooks';
import { doesCityPageExists } from './utils';

const CitySearch = () => {
  const history = useHistory();
  const { citiesData, isLoading, error: citiesDataError } = useCitiesJSONData();
  const [error, setError] = useState<string | null>(citiesDataError);

  const goToCityPage = useCallback((citySlug: string) => {
    history.push(`/fences/cities/${citySlug}`);
  }, []);

  const handleSubmit = useCallback(async (placeData: PlacesAutocompleteTypes.AutoCompletePlaceData) => {
    const { city_name, state_abbreviation } = placeData;
    setError(null);
    try {
      const citySlug = doesCityPageExists(city_name, state_abbreviation, citiesData);
      if (citySlug) {
        goToCityPage(citySlug);
      }
    } catch (e) {
      // seems we don't support that city :(
      setError('This city is not supported');
    }
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
