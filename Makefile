.PHONY: all build clean install run setup-local-domain test s3upload

LEVEL ?= development
LOCAL_DOMAIN ?= "ergeon.local"
S3_REGION ?= us-west-2
AWS_CLI ?= aws --region $(S3_REGION)

all: install run

build: clean
	npm run build-$(LEVEL)

clean:
	rm -rf dist/

setup-local-domain:
	grep -n $(LOCAL_DOMAIN) /etc/hosts >> /dev/null && echo "Domain is already set up. Terminating.." || echo "127.0.0.1	$(LOCAL_DOMAIN)" | sudo tee -a /etc/hosts > /dev/null | echo "Successfull. Happy ezcoding."

install: .install
.install: package.json
	npm install
	touch $@

lint: install
	npm run lint

run: install
	npm run start

test: install lint

deploy-staging:
	LEVEL=staging make build
	LEVEL=staging S3_BUCKET=dev.ergeon.com make s3upload
	LEVEL=staging DOMAIN=dev.ergeon.com make invalidate-cloudfront

deploy-production:
	LEVEL=production make build
	LEVEL=production S3_BUCKET=www.ergeon.com make s3upload
	LEVEL=production DOMAIN=www.ergeon.com make invalidate-cloudfront

s3upload:
	@if [ -z "$(S3_BUCKET)" ]; then >&2 echo S3_BUCKET must be supplied; exit 1; fi;
	$(AWS_CLI) s3 sync dist s3://$(S3_BUCKET)/  # use default cloudfront cache ttl
	# don't use cache index.html
	$(AWS_CLI) s3 cp dist/index.html s3://$(S3_BUCKET)/ --cache-control max-age=0; fi;
	$(AWS_CLI) s3 cp dist/utm/index.html s3://$(S3_BUCKET)/utm/ --cache-control max-age=0; fi;

invalidate-cloudfront:
	@if [ -z "$(DOMAIN)" ]; then >&2 echo DOMAIN must be supplied; exit 1; fi;

