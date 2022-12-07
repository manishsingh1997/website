import cityData from '../../data/cities/alameda-county-berkeley-ca.json';

import {getAsset, makePhoneLink, getHostnameAndPath, getProjectGalleryUrl} from './utils';

describe('AppCityPage utils', () => {
  test('getAsset', () => {
    expect(getAsset(cityData.regulations.pdf, 'pdf')).toMatchSnapshot();
    expect(getAsset(cityData.regulations.img, 'jpeg')).toMatchSnapshot();
    expect(getAsset(cityData.regulations.url, 'pdf')).toMatchSnapshot();
  });

  test('makePhoneLink', () => {
    expect(makePhoneLink('(510) 698-1800')).toBe('tel:+15106981800');
    expect(makePhoneLink('+1 (916) 713-3658')).toBe('tel:+19167133658');
  });

  test('get Hostname and path', () => {
    const sampleHostname = 'www.example.com';
    const samplePath = '/path/to/somwhere';
    const sampleURL = `${sampleHostname}${samplePath}`;

    const {hostname, path} = getHostnameAndPath(sampleURL);

    expect(hostname).toBe(sampleHostname);
    expect(path).toBe(samplePath);
  });

  test('get project gallery url', () => {
    const sampleHostname = 'https://ergeon.com/projects-gallery';
    const samplePath = '/path/to/somwhere';
    const sampleURL = `${sampleHostname}${samplePath}`;

    const expectedURL = `${process.env.PROJECTS_GALLERY_HOST}${samplePath}`;

    expect(getProjectGalleryUrl(sampleURL)).toBe(expectedURL);
  });
});
