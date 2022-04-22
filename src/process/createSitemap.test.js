/* eslint-disable camelcase */

import {generateErgeonSitemap, generateGallerySitemap, generateHelpSitemap} from './createSitemap';

jest.mock('bent', () => (type) => {
  switch (type) {
    case 'json':
    default:
      // Returns help node IDs mock
      return async () => [{node_key: 1}, {node_key: 2}, {node_key: 3}];
  }
});

describe('Sitemap', () => {
  it('should generate for website', async (done) => {
    const sitemap = await generateErgeonSitemap();
    expect(sitemap).toMatchSnapshot();
    done();
  });

  it('should generate for gallery', async (done) => {
    const sitemap = await generateGallerySitemap();
    expect(sitemap).toMatchSnapshot();
    done();
  });

  it('should generate for help', async (done) => {
    const sitemap = await generateHelpSitemap();
    expect(sitemap).toMatchSnapshot();
    done();
  });
});
