.PHONY: all build clean install run setup-local-domain test s3upload

LEVEL ?= development
CURRENT_BRANCH = $(shell git symbolic-ref --short -q HEAD)
LOCAL_DOMAIN="ergeon.local"

ifneq ($(STACK),)
	host := $(STACK).dev.ergeon.in
else ifeq ($(LEVEL),staging)
	host := dev.ergeon.in
else ifeq ($(LEVEL),production)
	host := ergeon.com
endif

all: install run

build:
	yarn run build-$(LEVEL)

clean:
	rm -rf dist/

setup-local-domain:
	grep -n $(LOCAL_DOMAIN) /etc/hosts >> /dev/null && echo "Domain is already set up. Terminating.." || echo "127.0.0.1	$(LOCAL_DOMAIN)" | sudo tee -a /etc/hosts > /dev/null | echo "Successfull. Happy ezcoding."

install:
	yarn install

lint:
	yarn run lint

run:
	yarn run start

test: lint

deploy-staging:
	LEVEL=staging make build
	HOST=appdev.ergeon.com make s3upload

deploy-production:
	LEVEL=production make build
	HOST=app.ergeon.com make s3upload

s3upload:
	@if [ -z "$(HOST)" ]; then >&2 echo HOST must be supplied; exit 1; fi;
	echo S3 deployment not configured; exit 1;
