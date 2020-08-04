import fs from 'fs';
import bent from 'bent';
import reduce from 'lodash/reduce';
import config from '../website/config.js';

const getJSON = bent('json');

const HOME_PAGE_URL = config.publicWebsite;
const HELP_PAGE_URL = `${HOME_PAGE_URL}/help`;

const sitemapXMLTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
{{urls}}
</urlset>
`;

/*
  The following method asks for all the help nodes to public admin
  and returns and url for each of them.
  Each of the urls will looks like https://www.ergeon.com/help/201900019
 */
const getNodeIds = async function() {
  try {
    const url = `${config.apiHost}/api/help/node/?domain=1`;
    const result = await getJSON(url);
    if (result && result.length) {
      return result.map(result => `${HELP_PAGE_URL}/${result.node_id}`);
    }
  } catch (e) {
    console.log(`Error while getting node ids ${e}`);
  }
};

const getAllSitemapUrls = async function() {
  const nodeIdsUrls =  await getNodeIds();
  const urls = [
    `${HOME_PAGE_URL}`,
    `${HOME_PAGE_URL}/careers`,
    `${HOME_PAGE_URL}/contacts`,
    `${HOME_PAGE_URL}/about-ergeon`,
    `${HOME_PAGE_URL}/gallery`,
    `${HOME_PAGE_URL}/faq`,
    ...nodeIdsUrls,
  ];
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

const writeSiteMap = async function() {
  const urlsAsXMLTags = await getAllSitemapUrls();
  const siteMapContent = sitemapXMLTemplate.replace('{{urls}}', urlsAsXMLTags);
  fs.writeFile('./src/data/sitemap.xml', siteMapContent,
    (err) => {
      if (err) throw err;
      console.log('Sitemap created, please verify the content of it');
      console.log(siteMapContent);
    });
};

writeSiteMap();
