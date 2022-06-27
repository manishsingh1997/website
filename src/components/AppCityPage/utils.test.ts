import cityData from '../../data/cities/alameda-county-berkeley-ca.json';
import {getAsset, makePhoneLink} from './utils';

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

  test('makePhoneLink', () => {
    expect(
      makePhoneLink('(510) 698-1800')
    ).toBe('tel:+15106981800');
    expect(
      makePhoneLink('+1 (916) 713-3658')
    ).toBe('tel:+19167133658');
  });
});
