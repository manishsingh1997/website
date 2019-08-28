# Website ergeon.com

### Requirements
```
node v6.17.1
yarn v1.16.0
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
First you need to install `s3cmd` and have aws credentials for the s3 servers.

* `make deploy-staging` will try to upload the build into the bucket for `dev.ergeon.com`
* `make deploy-production` will try to upload the build into the bucket for `ergeon.com`