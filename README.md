# Challenge 1: Cloud Slack Bot
Create a slack bot to manage cloud instances. You can choose whatever cloud provider you want (e.g. Openstack, AWS, GCP, Azure).

The bot should be able to support:
- Creating new instances
- Removing existing instances
- Starting an instance
- Stopping an instance
- Displaying the status of an instance
- List all available instances

The bot should also be able to show a help message.

## Tools
For the components that make up this application please use a tool/language you’re comfortable with from this list.

API Back End: Node or PHP

Database: MySQL or MongoDB

## Deliverables
When you reach a stage you’re happy with, you should provide:

- Instructions on how to use it
- A .zip file of your project, including any & all source files, a readme file (which also documents any assumptions made during the implementation), config, tests etc..
- A running slack bot account or a deployment script so we can test it

---

## Initial plan
Create MySQL database with table `instances`

| instanceId | status  |
|------------|---------|
| abc123     | running |
| def456     | stopped |
| hij789     | pending |

- /list-instances
🟢 abc123
🟠 hij789
🔴 def456

- /create-instance
🔴 def456
(should it also start it?)

- /remove-instance def456
(should we allow removing only stopped instances?)

- /start-instance def456
(doesn't do anything to pending/running instances)

- /stop-instance abc123
(doesn't do anything to stopped instances)

- /instance-status abc123
🟢 abc123


## References

- https://betterprogramming.pub/set-up-your-serverless-project-with-typescript-ready-to-deploy-to-aws-6cfd7b2e5263
- https://medium.com/glasswall-engineering/how-to-create-a-slack-bot-using-aws-lambda-in-1-hour-1dbc1b6f021c
- https://api.slack.com/start/building/bolt-js
# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f hello --path src/functions/hello/mock.json` if you're using NPM

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for the lambda functions
- `libs` - containing shared code base between the lambdas

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
