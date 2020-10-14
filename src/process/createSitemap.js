import fs from 'fs';
import path from 'path';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';

import {getHelpNodesURLs} from 'api/sitemap';
import {FencePhotoData, GatePhotoData, DrivewayPhotoData} from 'data/photo-gallery';
import {authRoutes, galleryRoutes, helpRoutes, publicRoutes} from 'public-routes';
import config from 'website/config';

const HOME_PAGE_URL = config.publicWebsite;

const sitemapXMLTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
{{urls}}
</urlset>
`;

/**
 * Get XML-tags from string URLs array.
 * @param {string[]} urls
 */
const generateSitemap = urls => {
  const urlsAsXMLTags = reduce(
    urls,
    (xml, url) => `${xml}
      <url>
        <loc>${url}</loc>
      </url>`,
    '',
  );
  return urlsAsXMLTags;
};

/**
 * Return URLs from route config.
 * @param {{component, exact, sitemap, path}} routes
 */
const getSitemapUrls = routes => {
  const paths = routes
    .filter(route => route.sitemap !== false)
    .filter(route => !route.path.includes(':'))
    .map(route => route.path);
  return paths.map(path => `${HOME_PAGE_URL}${path}`);
};

/**
 * Get the main sitemap.
 */
export const generateErgeonSitemap = async() => {
  const urls = sortBy([
    ...getSitemapUrls(authRoutes),
    ...getSitemapUrls(publicRoutes),
    config.blogHost,
  ]);
  return generateSitemap(urls);
};

/**
 * Prepare gallery URLs for adding to the Sitemap.
 * @param {FencePhotoData|GatePhotoData|DrivewayPhotoData} galleryData
 * @param {fence|gate|driveway} type
 */
const getGalleryURLs = (galleryData, type) => {
  const urls = [];
  galleryData.forEach(
    ({categorySlug, categoryGroups}) => {
      if (!isEmpty(categoryGroups)) {
        // Add sub-categories to the Sitemap.
        categoryGroups.forEach(({groupSlug}) => {
          urls.push(`${HOME_PAGE_URL}/gallery/${type}/${categorySlug}/${groupSlug}`);
        });
      } else {
        // No sub-categories, add just the category page itself.
        urls.push(`${HOME_PAGE_URL}/gallery/${type}/${categorySlug}`);
      }
    }
  );
  return urls;
};

/**
 * Get the sitemap for the /gallery section of the website.
 */
export const generateGallerySitemap = async() => {
  const urls = sortBy([
    ...getSitemapUrls(galleryRoutes),
    ...getGalleryURLs(FencePhotoData, 'fence'),
    ...getGalleryURLs(GatePhotoData, 'gate'),
    ...getGalleryURLs(DrivewayPhotoData, 'driveway'),
  ]);
  return generateSitemap(urls);
};

/**
 * Get the sitemap for the /help section of the website.
 */
export const generateHelpSitemap = async() => {
  const urls = sortBy(
    getSitemapUrls(helpRoutes)
      .concat(await getHelpNodesURLs()),
  );
  return generateSitemap(urls);
};

/**
 * Helper function to recursively created nested dirs.
 * @param {string} filePath
 */
const createDirIfNotExists = filePath => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  createDirIfNotExists(dirname);
  fs.mkdirSync(dirname);
};

/**
 * Save a sitemap into a file.
 * @param {string[]} urls
 * @param {string} filePath
 */
const writeSiteMap = (urls, filePath) => {
  const siteMapContent = sitemapXMLTemplate.replace('{{urls}}', urls);
  createDirIfNotExists(filePath);
  fs.writeFile(filePath, siteMapContent,
    (err) => {
      if (err) throw err;
      console.log(`Sitemap ${filePath} created, please verify the content of it:`);
      console.log(siteMapContent);
    });
};

if (typeof jest !== 'undefined') {
  // Just skip in tests
} else {
  // Generate all sitemaps
  (async() => {
    writeSiteMap(await generateErgeonSitemap(), './src/data/sitemap.xml');
    writeSiteMap(await generateGallerySitemap(), './src/data/gallery/sitemap.xml');
    writeSiteMap(await generateHelpSitemap(), './src/data/help/sitemap.xml');
  })();
}
