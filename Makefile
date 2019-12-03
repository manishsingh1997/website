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
	S3_BUCKET=dev.ergeon.com make s3upload
	DOMAIN=dev.ergeon.com make invalidate-cloudfront

deploy-production:
	LEVEL=production make build
	S3_BUCKET=www.ergeon.com make s3upload
	DOMAIN=www.ergeon.com make invalidate-cloudfront

s3upload:
	@if [ -z "$(S3_BUCKET)" ]; then >&2 echo S3_BUCKET must be supplied; exit 1; fi;
	$(AWS_CLI) s3 sync dist s3://$(S3_BUCKET)/  # use default cloudfront cache ttl

invalidate-cloudfront:
	@if [ -z "$(DOMAIN)" ]; then >&2 echo DOMAIN must be supplied; exit 1; fi;
	$(AWS_CLI) cloudfront create-invalidation --distribution-id `$(AWS_CLI) cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, '$(DOMAIN)')].Id" --output text` --paths /index.html

