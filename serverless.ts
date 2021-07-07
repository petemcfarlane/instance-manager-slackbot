import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import listInstances from "@functions/listInstances";
import createInstance from "@functions/createInstance";

const serverlessConfiguration: AWS = {
  service: "qhealth",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
    profile: "serverless-deploy",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["ec2:DescribeInstances"],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: { hello, listInstances, createInstance },
};

module.exports = serverlessConfiguration;
