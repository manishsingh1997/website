import cityData from '../../data/cities/alameda-county-berkeley-ca.json';
import {getAsset} from './utils';

describe('AppCityPage utils', () => {
  test('getAsset', () => {
    expect(
      getAsset(cityData.regulations.pdf, 'pdf')
    ).toMatchSnapshot();
    expect(
      getAsset(cityData.regulations.img, 'jpeg')
    ).toMatchSnapshot();
    expect(
      getAsset(cityData.regulations.url, 'pdf')
    ).toMatchSnapshot();
  });
});
