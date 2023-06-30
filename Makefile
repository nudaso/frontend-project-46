lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8

install-deps:
	npm ci
