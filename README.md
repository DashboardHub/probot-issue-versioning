# DashboardHub Probot Issue Versioning

GitHub issue versioning with probot

## Dependencies

- [Probot](https://github.com/probot/probot)
- [Serverless](https://serverless.com)

## Screenshot

![Screenshot](https://user-images.githubusercontent.com/624760/31160750-b369f874-a8ca-11e7-9d85-6548a78f0894.png)

## Quickstart

Using `make` commands.

### Install

`make install`

### Run offline / locally

`make run`

### Deploy

Before deploy make sure you have setup:

- `aws` cli with credentials
- Github Secret key as an `envar`

Then `WEBHOOK_SECRET=<your-github-secret-key> make deploy`
