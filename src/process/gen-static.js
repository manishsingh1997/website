const fs = require('fs');

const dotenv = require('dotenv');
const puppeteer = require('puppeteer');
const HTMLParser = require('node-html-parser');

const {createDirIfNotExists} = require('./utils');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36';

let browser;

const devEnv = dotenv.config({
  path: './.env.development',
});
const env = dotenv.config({
  path: `./.env.${process.env.LEVEL}`,
});

async function createPage() {
  browser = await puppeteer.launch({
    executablePath: 'google-chrome', // in Circle CI

    // // Uncomment for testing
    // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Mac OS
    // headless: false,
  });
  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);
  return page;
}

async function getServerHTML(page, url) {
  const response = await page.goto(url);
  const data = await response.buffer();
  const HTML = data.toString('utf8');

  return HTML;
}

async function getHTML(page, url) {
  try {
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 10000,
    });
  } catch (error) {
    if (!/Navigation timeout of \d+ ms exceeded/i.test(error.message)) {
      throw error;
    }
  }
  const HTML = await page.evaluate(() => document.documentElement.outerHTML);
  return HTML;
}

function getURLsFromSitemapXML(sitemapXML) {
  const sitemapDOM = HTMLParser.parse(sitemapXML);
  const URLs =
    Array.from(sitemapDOM.querySelectorAll('loc'))
      .map(({ innerText }) => new URL(innerText))
      .filter(({ host }) => env.parsed.WEBSITE_DOMAIN === host);
  return URLs;
}

function saveHTML(path, content) {
  createDirIfNotExists(path);
  fs.writeFileSync(path, content, {encoding: 'utf8'});

  console.log(`${path} added`);
}

(async () => {
  const { host: HOME_HOST } = new URL(devEnv.parsed.HOME_PAGE);

  const page = await createPage();

  const templateHTML = await getServerHTML(page, devEnv.parsed.HOME_PAGE);

  const sitemapXML = await getServerHTML(page, `${devEnv.parsed.HOME_PAGE}/sitemap.xml`);
  const URLs = getURLsFromSitemapXML(sitemapXML);

  for (const location of URLs) {
    const HTML = await getHTML(page, `${devEnv.parsed.HOME_PAGE}${location.pathname}`);
    const DOM = HTMLParser.parse(HTML);

    const rootContent = DOM.querySelector('#root > *');
    if (!rootContent) {
      console.warn(`No app content ${location.href}`);
      continue;
    }

    const templateDOM = HTMLParser.parse(templateHTML);

    const appRoot = templateDOM.querySelector('#root');
    appRoot.appendChild(rootContent);

    const head = templateDOM.querySelector('head');
    Array.from(DOM.querySelectorAll('head style')).map(node => {
      head.appendChild(node);
    });

    const title = DOM.querySelector('title');
    if (title) {
      head.appendChild(DOM.querySelector('title'));
    }

    const description = DOM.querySelector('meta[name="description"]');
    if (description) {
      head.appendChild(description);
    }

    saveHTML(`dist${location.pathname}/index.html`, templateDOM.toString());
  }

  await browser.close();
  console.log('Static generation done!');

  process.exit(0);
})();
