# Website ergeon.com

[![CircleCI](https://circleci.com/gh/ergeon/website/tree/develop.svg?style=shield&circle-token=e57a10563d37a3aaa49ec37fdd3c85d343563100)](https://circleci.com/gh/ergeon/website/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/ergeon/website/badge.svg?branch=develop&t=sx2PhQ)](https://coveralls.io/github/ergeon/website?branch=develop)

### Requirements

```
node v14.17.5
npm v6.14.14
```

### Installation

install `libjpeg` package for `make install` to work properly

OSX

`brew install libjpeg`

Linux

`sudo apt-get install libjpeg-dev`


```bash
make install
```

Add the following line to `/etc/hosts` on your host machine

```
127.0.0.1  ergeon.local
```

Or do it automatically with:

```bash
make setup-local-domain
```

### Development

Run development webpack server

```bash
make run
```

Settings from `.env.development` will be used.
It is possible to override them: create `.env.local` file and override any env variable there.
For example, for easier development, you can use our staging back-end API to not spin it up locally.

To do it, add the following to your `.env.local`:

```
API_HOST = "https://apidev.ergeon.in"
```

Do **NOT** copy entire `.env.staging` to your `.env.local`, copy only needed variables.
In this case, **only** `API_HOST` must be redefined and nothing else.

### Coding rules

The rules are inspired from this [doc](https://github.com/airbnb/javascript/tree/master/react).

### Sentry integration

Sentry is used to track errors. To not miss errors during starting stage - sentry script
is loaded before any app script.

But Sentry is still used inside the app to attach custom breadcrumbs. So it is important to match sentry versions: in the app and from CDN.

### Run tests

Run tests and lint.

```bash
make test
```

Development server should be running in `ergeon.local:6600`

### Build

Build in `dist/` folder

```bash
make build
```

### Deployment

Deployment will happen automatically by CI/CD scripts. Manual deployment is not recommended, it should be done only in exceptional cases.

First you need to install [`awscli`](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html) and have aws credentials for the s3 servers.

- `make deploy-staging` will try to upload the build into the bucket for `dev.ergeon.com`
- `make deploy-production` will try to upload the build into the bucket for `ergeon.com`

### Create Sitemap

The sitemap will be created automatically by production deployments.

How it works?

1. Production deployment call `make create-sitemap` which creates the sitemap.
   The output is placed at src/process/sitemap.xml.
2. Then, the build for production is done and sitemap is copyied by webpack from origal location to /dist.
3. Finally, sitemap is uploaded to s3 inside /dist folder.

It's possible to create a sitemap manually by running the following command,

```bash
make create-sitemap
```

### Parse cities data
The cities data parsing takes 3 steps:

1. Connect to the City Page Data (Google Spreadsheet). Parse it and create cities full data JSON file, cities min data JSON file, city full data JSON file per each city.
2. Download assets (Google Drive links within the document).
3. Manually load these assets to staging and production S3 under `ASSETS_FOLDER_NAME` folder.
    1. The folder name is stored as a constant in `src/process/cities/constants.json`.

> Currently, step 3 is done manually. In the future we should be able to automate it by syncing cities assets folder with the corresponding folder in S3.

For 1-2 run:
```bash
make parse-cities-data
```

NOTE 1!

You will have to setup Google OAuth credentials and save them under `[MAIN_PROJECT_DIRECTORY]/.google/credentials.json`:
```json
{
  "installed": {
    "client_id": "[CLIENT_ID]",
    "project_id": "www-ergeon-com-local",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "[CLIENT_SECRET]",
    "redirect_uris": [
      "http://localhost"
    ]
  }
}
```

NOTE 2!

Google authentication requires sign in to your ergeon’s Google account. You will be guided through the console. After that, the token will be saved under `[MAIN_PROJECT_DIRECTORY]/.google/token.json` and re-used.

### Redirects

Sometimes it is needed to setup redirects at server-side level for SEO purposes.

Since we are deploying this project into AWS S3 bucket - we can define routing rules at [S3 bucket level](https://github.com/ergeon/infrastructure/blob/master/ergeon.com-landing/routing_rules.json).
But it has limitation: only 50 routing rules can be defined like this. We need more, so in addition to S3-bucket routing rules we are defining [object redirects](https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-page-redirect.html#advanced-conditional-redirects).

To define a redirect, add a record into `src/process/redirects/redirects.json`. The redirect will be created automatically on deployment.

Imporant note: once added, don't remove entry from `redirects.json`. Instead, set `"active": false`. Having that the script can understand that existing redirect should be removed.

### Google API Key

In addition to permissions used by dependant packages, current projects require following enabled APIs:

- Geocoding API
