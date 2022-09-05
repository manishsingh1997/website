import fs from 'fs';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';
import {config as dotenvConfig} from 'dotenv-defaults';

import {getHelpNodesURLs} from 'api/sitemap';
import {FencePhotoData, GatePhotoData} from 'data/photo-gallery';
import {authRoutes, basicRoutes, galleryRoutes, helpRoutes} from 'routes/public';

import citiesMinData from '../data/cities-min-data.json';
import {CITIES_PAGE_PATH} from '../website/constants';
import {createDirIfNotExists} from './utils';

// this script is running outside of webpack, need to initialize dotenv directly
const ENV_CONFIG_FOLDER = `${__dirname}/../..`;
dotenvConfig({
  path: `${ENV_CONFIG_FOLDER}/.env.local`,
  defaults: `${ENV_CONFIG_FOLDER}/.env.${process.env.NODE_ENV}`,
  expand: true,
});

const HOME_PAGE_URL = process.env.HOME_PAGE;

const sitemapXMLTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<{{templateType}}
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
{{urls}}
</{{templateType}}>
`;

const SITEMAP_FILE_LIST = [
  'sitemap.xml',
  'gallery-sitemap.xml',
  'help-sitemap.xml',
  'projects-gallery/sitemap.xml',
  'blog/sitemap.xml',
  'catalog/sitemap.xml',
];

/**
 * Pre-process URLs.
 * @param {string[]} urls
 */
const processURLs = (urls) => {
  return sortBy(urls).map((url) => {
    if (/\/$/.test(url)) return url;
    return `${url}/`;
  });
};

/**
 * Get XML-tags from string URLs array.
 * @param {string[]} urls
 * @param {url|sitemap} tag
 */
const generateSitemap = (urls, tag = 'url') => {
  const lastMod = new Date().toISOString()
  const urlsAsXMLTags = reduce(
    urls,
    (xml, url) => `${xml}
      <${tag}>
        <loc>${url}</loc>
        <lastmod>${lastMod}</lastmod>
      </${tag}>`,
    ''
  );
  return urlsAsXMLTags;
};

/**
 * Return URLs from route config.
 * @param {{component, exact, sitemap, path}} routes
 */
const getSitemapUrls = (routes) => {
  const paths = routes
    .filter((route) => route.sitemap !== false)
    .filter((route) => !route.path.includes(':'))
    .map((route) => route.path);
  return paths.map((path) => `${HOME_PAGE_URL}${path}`);
};

const getCitiesURLs = () => {
  return citiesMinData.map(({slug}) => `${HOME_PAGE_URL}${CITIES_PAGE_PATH}/${slug}`);
};

/**
 * Get the index sitemap.
 */
export const generateIndexSitemap = async () => {
  const urls = SITEMAP_FILE_LIST.map((url) => `${HOME_PAGE_URL}/${url}`);

  return generateSitemap(urls, 'sitemap');
};

/**
 * Get the main sitemap.
 */
export const generateErgeonSitemap = async () => {
  const urls = processURLs([
    ...getSitemapUrls(authRoutes),
    ...getSitemapUrls(basicRoutes),
    ...getCitiesURLs(),
    process.env.BLOG_HOST,
    process.env.STORE_HOST,
  ]);
  return generateSitemap(urls);
};

/**
 * Prepare gallery URLs for adding to the Sitemap.
 * @param {FencePhotoData|GatePhotoData} galleryData
 * @param {fence|gate} type
 */
const getGalleryURLs = (galleryData, type) => {
  const urls = [];
  galleryData.forEach(({categorySlug, categoryGroups}) => {
    if (!isEmpty(categoryGroups)) {
      // Add sub-categories to the Sitemap.
      categoryGroups.forEach(({groupSlug}) => {
        urls.push(`${HOME_PAGE_URL}/gallery/${type}/${categorySlug}/${groupSlug}`);
      });
    } else {
      // No sub-categories, add just the category page itself.
      urls.push(`${HOME_PAGE_URL}/gallery/${type}/${categorySlug}`);
    }
  });
  return urls;
};

/**
 * Get the sitemap for the /gallery section of the website.
 */
export const generateGallerySitemap = async () => {
  const urls = processURLs([
    ...getSitemapUrls(galleryRoutes),
    ...getGalleryURLs(FencePhotoData, 'fence'),
    ...getGalleryURLs(GatePhotoData, 'gate'),
  ]);
  return generateSitemap(urls);
};

/**
 * Get the sitemap for the /help section of the website.
 */
export const generateHelpSitemap = async () => {
  const helpNodeURLs = await getHelpNodesURLs();
  const urls = processURLs([...getSitemapUrls(helpRoutes), ...helpNodeURLs]);
  return generateSitemap(urls);
};

/**
 * Save a sitemap into a file.
 * @param {string[]} urls
 * @param {string} filePath
 * @param {urlset|sitemapindex} templateType
 */
const writeSiteMap = (urls, filePath, templateType = 'urlset') => {
  const siteMapContent = sitemapXMLTemplate.replace('{{urls}}', urls).replace(/{{templateType}}/g, templateType);
  createDirIfNotExists(filePath);
  fs.writeFile(filePath, siteMapContent, (err) => {
    if (err) throw err;
    console.warn(`Sitemap ${filePath} created, please verify the content of it:`);
    console.warn(siteMapContent);
  });
};

if (typeof jest !== 'undefined') {
  // Just skip in tests
} else {
  // Generate all sitemaps
  (async () => {
    // Extract the first three values from the array
    const [base, gallery, help] = SITEMAP_FILE_LIST;

    writeSiteMap(await generateErgeonSitemap(), `./src/data/${base}`);
    writeSiteMap(await generateGallerySitemap(), `./src/data/${gallery}`);
    writeSiteMap(await generateHelpSitemap(), `./src/data/${help}`);
    writeSiteMap(await generateIndexSitemap(), './src/data/sitemap-index.xml', 'sitemapindex');
  })();
}
