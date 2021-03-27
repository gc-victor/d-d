.DEFAULT_GOAL := help

help: ## Show this help message
	@echo 'usage: make [target] <type> <name>'
	@echo
	@echo 'Targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

format : ## Enforces a consistent style by parsing your code and re-printing it
	npx prettier --write "./**/*.js" ;\

dev : ## Run a dev static server
	export NODE_ENV=development && node index.js || exit $? ; \

# catch anything and do nothing
%:
	@:
