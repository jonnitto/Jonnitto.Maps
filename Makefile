.PHONY: help install copy-images watch dev production build prettier

.DEFAULT_GOAL := build

## Prettier files
prettier:
	pnpm prettier --write --no-error-on-unmatched-pattern 'Resources/Private/**/*.{js,ts,php,yaml,pcss}'
	pnpm prettier --write --no-error-on-unmatched-pattern '{Configuration,NodeTypes,Classes}/**/*.{js,ts,php,yaml,pcss}'

## Install dependencies and build production version
build: prettier install production

## Install dependencies
install:
	pnpm install

## Watch for changes in JS and CSS files
watch:
	pnpm watch

## Build development version
dev:
	pnpm dev

## Build production version
production:
	pnpm build

# Define colors
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

# define indention for descriptions
TARGET_MAX_CHAR_NUM=15

## Show help
help:
	@echo ''
	@echo '${GREEN}CLI command list:${RESET}'
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
	@echo ''
