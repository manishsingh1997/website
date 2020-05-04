.PHONY: all build clean install run setup-local-domain test s3upload

LEVEL ?= development
LOCAL_DOMAIN ?= "ergeon.local"
S3_REGION ?= us-west-2
AWS_CLI ?= aws --region $(S3_REGION)
SENTRY_RELEASE_NAME ?= `git rev-parse HEAD`
SENTRY_CLI ?= sentry-cli
DIST_PATH ?= dist/

# Don't deploy source maps on production due to security reasons
ifeq ($(LEVEL), production)
AWS_S3_SYNC_PARAMS ?= --exclude "*.js.map"
else
AWS_S3_SYNC_PARAMS ?=
endif

all: install run

build: clean
	SENTRY_RELEASE_NAME=$(SENTRY_RELEASE_NAME) npm run build-$(LEVEL)

clean:
	rm -rf $(DIST_PATH)

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

sentry-upload-sourcemaps:
	 $(SENTRY_CLI) releases files $(SENTRY_RELEASE_NAME) upload-sourcemaps $(DIST_PATH) --rewrite -i node_modules/ -i webpack.*

deploy-staging:
	LEVEL=staging make build
	LEVEL=staging S3_BUCKET=dev.ergeon.com make s3upload
	LEVEL=staging DOMAIN=dev.ergeon.com make invalidate-cloudfront

deploy-production:
	LEVEL=production make build
	LEVEL=production S3_BUCKET=www.ergeon.com make s3upload
	LEVEL=production DOMAIN=www.ergeon.com make invalidate-cloudfront
	LEVEL=production make sentry-upload-sourcemaps

s3upload:
	@if [ -z "$(S3_BUCKET)" ]; then >&2 echo S3_BUCKET must be supplied; exit 1; fi;
	$(AWS_CLI) s3 sync $(DIST_PATH) s3://$(S3_BUCKET)/ $(AWS_S3_SYNC_PARAMS)  # use default cloudfront cache ttl
	# don't use cache index.html
	$(AWS_CLI) s3 cp $(DIST_PATH)/index.html s3://$(S3_BUCKET)/ --cache-control max-age=0
	@if [ "$(LEVEL)" != "production" ]; then $(AWS_CLI) s3 cp $(DIST_PATH)/utm/index.html s3://$(S3_BUCKET)/utm/ --cache-control max-age=0; fi;

invalidate-cloudfront:
	@if [ -z "$(DOMAIN)" ]; then >&2 echo DOMAIN must be supplied; exit 1; fi;
	@if [ "$(LEVEL)" = "production" ]; then $(AWS_CLI) cloudfront create-invalidation --distribution-id `$(AWS_CLI) cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, '$(DOMAIN)')].Id" --output text` --paths /utm/index.html /utm/; fi;
