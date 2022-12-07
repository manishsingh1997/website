import React from 'react';

import {CitySearchInput, PlacesAutocompleteTypes} from '@ergeon/core-components';

type CitySearchInputFieldProps = {
  onChange(placeData: PlacesAutocompleteTypes.AutoCompletePlaceData): void;
};

const CitySearchInputField = (props: CitySearchInputFieldProps) => {
  const {onChange} = props;

  return (
    <CitySearchInput
      handleButtonClick={onChange}
      inputLabel="Your address"
      isLoading={false}
      placeholder={'Address or City (optional)'}
    />
  );
};

export default CitySearchInputField;
