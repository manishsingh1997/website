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
