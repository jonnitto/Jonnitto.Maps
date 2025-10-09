.PHONY: help install prepare watch dev production build prettier protomaps-assets leaflet-assets

.DEFAULT_GOAL := build

## Prettier files
prettier:
	pnpm prettier --write --no-error-on-unmatched-pattern '{*,**/*}.{mjs,php,yaml,pcss,js,json,md}'

## Install dependencies and build production version
build: install prettier production

## Download Protmaps assets
protomaps-assets:
	wget https://github.com/protomaps/basemaps-assets/archive/refs/heads/main.zip
	unzip main.zip
	rm main.zip
	mkdir -pv Resources/Public/Protomaps/Fonts
	mkdir -pv Resources/Public/Protomaps/Sprites
	mv basemaps-assets-main/fonts/* Resources/Public/Protomaps/Fonts/
	mv basemaps-assets-main/sprites/v4/* Resources/Public/Protomaps/Sprites/
	rm -rf basemaps-assets-main

leaflet-assets:
	mkdir -pv Resources/Public/Styles/images
	cp -r node_modules/leaflet/dist/images/* Resources/Public/Styles/images/

## Prepare Public folder
prepare:
	rm -rf Resources/Public
	make protomaps-assets
	make leaflet-assets

## Install dependencies
install:
	pnpm install

## Watch for changes in JS and CSS files
watch:
	make prepare
	pnpm watch

## Build development version
dev:
	make prepare
	pnpm dev

## Build production version
production:
	make prepare
	pnpm build

# Define colors
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

# define indention for descriptions
TARGET_MAX_CHAR_NUM=16

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
