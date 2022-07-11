export const mockPlace = {
  address_components: [
    {long_name: '48', short_name: '48', types: ['street_number']},
    {
      long_name: 'Palo Alto',
      short_name: 'Palo Alto',
      types: ['route'],
    },
    {
      long_name: 'Palo Alto Avenue',
      short_name: 'Palo Alto Avenue',
      types: ['locality', 'political'],
    },
    {
      long_name: 'San Francisco County',
      short_name: 'San Francisco County',
      types: ['administrative_area_level_2', 'political'],
    },
    {
      long_name: 'California',
      short_name: 'CA',
      types: ['administrative_area_level_1', 'political'],
    },
    {
      long_name: 'United states',
      short_name: 'USA',
      types: ['country', 'political'],
    },
    {
      long_name: '94301',
      short_name: '94301',
      types: ['postal_code'],
    },
  ],
  // formatted_address: 'San Francisco, CA, USA',
  primary_number: '12',
  street_name: 'Palo Alto Avenue',
  city_name: 'Palo Alto',
  state_abbreviation: 'CA',
  zipcode: '94301',
  location: {
    lat: 37.4465663,
    lng: -122.170966,
  },
  formatted_address: '12 Palo Alto Ave, Palo Alto, CA 94301, USA',
  raw_address: '12 Palo Alto Ave, Palo Alto, CA 94301, USA',
  place_types: ['street_address'],
  geometry: {
    bounds: {
      south: 37.6398299,
      west: -123.17382499999997,
      north: 37.9298239,
      east: -122.28178000000003,
    },
    location: {lat: 37.7749295, lng: -122.41941550000001},
    location_type: 'APPROXIMATE',
    viewport: {
      south: 37.70339999999999,
      west: -122.52699999999999,
      north: 37.812,
      east: -122.34820000000002,
    },
  },
  place_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
  types: ['locality', 'political'],
};

class AutocompleteMock {
  addListener = (eventType, callback) => {
    callback();
  };

  getPlace = () => {
    return mockPlace;
  };
}

export const mockGoogle = {
  maps: {
    places: {
      Autocomplete: AutocompleteMock,
      PlacesServiceStatus: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        NOT_FOUND: 'NOT_FOUND',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  },
};
