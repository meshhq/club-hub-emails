# Bins
TSC := node_modules/.bin/tsc
MOCHA := node_modules/.bin/mocha
TSLINT := node_modules/.bin/tslint

GULP = node ./node_modules/gulp/bin/gulp.js

# Env variables.
export NODE_ENV = test

# Shell command to find all .ts files.
src_files = $(shell find . -name '*.ts' ! -path '*/node_modules/*')

build: $(src_files) deps
	@eval $(GULP) build --production
	@echo "Re-Transpiling Project..."
	@eval $(TSC)

deps: package.json
	npm install --global foundation-cli
	npm install 

start: 
	@eval $(GULP)

build-test: $(src_files)
	@eval $(GULP) build --production --test
	@echo "Re-Transpiling Project..."
	@eval $(TSC)

test: build-test
	NODE_ENV=test LOGGER_DISABLED=true ./node_modules/.bin/mocha --exit --bail --recursive --sort --full-trace ./dist/tests





