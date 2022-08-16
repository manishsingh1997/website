import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { CitySearchInput, PlacesAutocompleteTypes } from '@ergeon/core-components';
// @ts-ignore
import { FENCE_SLUG } from '@ergeon/core-components/src/constants';

import { trackAddressEntered } from '../../../../utils/analytics';
import { CitiesJSONData } from './consts';
import { getCityPath, getExistingCitySlug } from './utils';

const CitySearch = () => {
  const history = useHistory();
  const [error, setError] = useState<string | null>();

  const goToCityPage = useCallback((citySlug: string) => {
    history.push(getCityPath(citySlug));
  }, [history]);

  const goToFencesPage = useCallback(() => {
    history.push('/fences');
  }, [history]);

  const handleSubmit = useCallback(async (placeData: PlacesAutocompleteTypes.AutoCompletePlaceData) => {
    const { city_name, state_abbreviation } = placeData;
    const leadData = {
      address: placeData,
      product_slug: FENCE_SLUG,
    }
    trackAddressEntered(leadData);
    setError(null);
    try {
      const citySlug = getExistingCitySlug(city_name, state_abbreviation, CitiesJSONData);
      if (citySlug) {
        goToCityPage(citySlug);
      }
    } catch (e) {
      // seems we don't support that city :(
      setError('This city is not supported');
      goToFencesPage();
    }
  }, [CitiesJSONData, goToCityPage]);

  return (
    <CitySearchInput
      error={error}
      handleButtonClick={handleSubmit}
    />
  );
}

export default CitySearch;
