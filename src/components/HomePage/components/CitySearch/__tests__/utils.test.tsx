import '@testing-library/jest-dom';
import { getExistingCitySlug } from '../utils';
import CitiesJSONData from '../../../../../data/cities-min-data.json'
import CitiesNeighboringJSONData from '../../../../../data/cities-neighboring-data.json'

const citiesData = {
  cities: CitiesJSONData,
  neighboring: CitiesNeighboringJSONData,
};

describe('CitySearch utils tests', () => {
  it('should return slug from cities data', () => {
    const slug = getExistingCitySlug('Alameda', 'CA', citiesData);
    expect(slug).toBe('alameda-county-alameda-ca');
  });

  it('should return slug from neighboring data', () => {
    const slug = getExistingCitySlug('Wallace', 'CA', citiesData);
    expect(slug).toBe('san-joaquin-county-lodi-ca');
  });

  it('should return slug from CA non supported state', () => {
    const slug = getExistingCitySlug('Palm Springs', 'CA', citiesData);
    expect(slug).toBe('santa-clara-county-san-jose-ca');
  });

  it('should return slug from TX non supported state', () => {
    const slug = getExistingCitySlug('Corpus Christi', 'TX', citiesData);
    expect(slug).toBe('dallas-county-dallas-tx');
  });

  it('should return slug from GA non supported state', () => {
    const slug = getExistingCitySlug('Savannah', 'GA', citiesData);
    expect(slug).toBe('fulton-county-atlanta-ga');
  });
});
