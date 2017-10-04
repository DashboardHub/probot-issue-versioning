.DEFAULT_GOAL := help

help:
	@echo 'Please read the documentation in "https://github.com/DashboardHub/probot-issue-versioning"'

install:
	npm install

run:
	serverless offline start

deploy:
	sed -i 's/<WEBHOOK_SECRET>/${WEBHOOK_SECRET}/g' ./serverless.yml
	serverless deploy -v

remove:
	serverless remove -v
