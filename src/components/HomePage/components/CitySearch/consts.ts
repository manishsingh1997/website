import citiesJSONData from '../../../../data/cities-min-data.json';
import neighboringJSONData from '../../../../data/cities-neighboring-data.json';

import { CitiesJSONData as CitiesJSONDataType } from './types';

export const CitiesJSONData: CitiesJSONDataType = {
  cities: citiesJSONData,
  neighboring: neighboringJSONData,
};
