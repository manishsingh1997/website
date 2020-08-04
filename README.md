# Website ergeon.com

### Requirements
```
node v11.15.0
npm v6.13.1
```

### Installation

```bash
make install
```

Add the following line to `/etc/hosts` on your host machine

```
127.0.0.1  ergeon.local
```

### Development

Run development webpack server

```bash
make run
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
1. Production deployment call `make create-site-map` which creates the sitemap. 
The output is placed at src/process/sitemap.xml.
2. Then, the build for production is done and sitemap is copyied by webpack from origal location to /dist.
3. Finally, sitemap is uploaded to s3 inside /dist folder.

It's possible to create a sitemap manually by running the following command,

```bash
make create-site-map
```