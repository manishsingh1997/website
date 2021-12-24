# Website ergeon.com

### Requirements
```
node v14.17.5
npm v6.14.14
```

### Installation

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

* `make deploy-staging` will try to upload the build into the bucket for `dev.ergeon.com`
* `make deploy-production` will try to upload the build into the bucket for `ergeon.com`

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

### Redirects

Sometimes it is needed to setup redirects at server-side level for SEO purposes.

Since we are deploying this project into AWS S3 bucket - we can define routing rules at [S3 bucket level](https://github.com/ergeon/infrastructure/blob/master/ergeon.com-landing/routing_rules.json).
But it has limitation: only 50 routing rules can be defined like this. We need more, so in addition to S3-bucket routing rules we are defining [object redirects](https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-page-redirect.html#advanced-conditional-redirects).


To define a redirect, add a record into `src/process/redirects/redirects.json`. The redirect will be created automatically on deployment.


Imporant note: once added, don't remove entry from `redirects.json`. Instead, set `"active": false`. Having that the script can understand that existing redirect should be removed.

### Google API Key
In addition to permissions used by dependant packages, current projects require following enabled APIs:
- Geocoding API
