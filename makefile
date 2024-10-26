#---VARIABLES---------------------------------#

#---GIT---#
GIT  = git
#------------#

#---DOCKER---#
DOCKER = docker
DOCKER_RUN = $(DOCKER) run
DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_UP = $(DOCKER_COMPOSE) up -d
DOCKER_COMPOSE_STOP = $(DOCKER_COMPOSE) stop
#------------#

#---PNPM-----#
PNPM = pnpm
PNPM_INSTALL = $(PNPM) install --force
PNPM_BUILD = $(PNPM) run build
PNPM_DEV = $(PNPM) run dev
PNPM_START = $(PNPM) run star
#------------#

#---PHPUNIT-#
PHPUNIT = APP_ENV=test $(SYMFONY) php bin/phpunit
#------------#
#---------------------------------------------#

DOTENV= dotenv -e .env.local --

## === 🆘  HELP ==================================================
help: ## Show this help.
	@echo "Makefile Doc"
	@echo "---------------------------"
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
#---------------------------------------------#

## === 🐋  DOCKER ================================================
docker-up: ## Start docker containers.
	# $(DOCKER_COMPOSE_UP)
.PHONY: docker-up

docker-stop: ## Stop docker containers.
	# $(DOCKER_COMPOSE_STOP)
.PHONY: docker-stop
#---------------------------------------------#

## === 📦  PNPM ===================================================
pnpm-install: ## Install pnpm dependencies.
	pnpm install
.PHONY: pnpm-install

husky: ## Install Husky hook.
	pnpm husky
.PHONY: pnpm-install

pnpm-update: ## Update pnpm dependencies.
	pnpm update
.PHONY: pnpm-update

pnpm-build: ## Build assets.
	pnpm run build
.PHONY: pnpm-build

pnpm-dev: ## Build assets in dev mode.
	pnpm run dev
.PHONY: pnpm-dev

pnpm-dev-server: ## Build assets in dev mode and watch.
	pnpm run dev-server
.PHONY: pnpm-dev-server

pnpm-watch: ## Watch assets.
	pnpm run watch
.PHONY: pnpm-watch
#---------------------------------------------#

## === 🔎  TESTS =================================================
tests: ## Run tests.
	$(PHPUNIT) --testdox
.PHONY: tests

tests-coverage: ## Run tests with coverage.
	$(PHPUNIT) --coverage-html var/coverage
.PHONY: tests-coverage
#---------------------------------------------#

## === ⭐  APPLICATION =================================================
pem: ## Generate JWT tokens.
	mkdir -p config/jwt
	openssl genrsa -out config/jwt/private.pem 4096
	openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
	chmod -R 775 config/
.PHONY: pem


checkout: ## Pull all modules for the specified branch. Eg: make checkout dev
	$(GIT) git checkout $(filter-out $@,$(MAKECMDGOALS))
	$(GIT) pull
.PHONY: checkout


checkout-dev:  ## Pull all modules for branch dev.
	$(GIT) pull
	$(GIT) git checkout dev
	$(GIT) git pull
.PHONY: checkout-dev

lint:  ## check the project.
	$(PNPM) lint
.PHONY: lint

dev:  ## Start the dev server.
	$(MAKE) pnpm-dev
.PHONY: dev

#---------------------------------------------#

## === ⭐  OTHERS =================================================
before-commit: tests ## Run before commit.
.PHONY: before-commit

first-install:  ## First install.
	$(MAKE) pnpm-install
	$(MAKE) husky
	$(MAKE) data
	$(MAKE) pnpm-dev
.PHONY: first-install

docker-start: docker-up  ## Start project.
.PHONY: docker-start

docker-stop: docker-stop  ## Stop project.
.PHONY: docker-stop