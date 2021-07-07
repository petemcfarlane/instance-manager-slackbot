import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import listInstances from "@functions/listInstances";
import createInstance from "@functions/createInstance";
import startInstance from "@functions/startInstance";
import stopInstance from "@functions/stopInstance";
import terminateInstance from "@functions/terminateInstance";

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: "qhealth",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack", "serverless-dotenv-plugin"],
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
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "ec2:DescribeInstances",
              "ec2:StartInstances",
              "ec2:StopInstances",
              "ec2:TerminateInstances",
            ],
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: "ec2:RunInstances",
            Resource: [
              {
                "Fn::Join": [
                  ":",
                  ["arn:aws:ec2:*", { Ref: "AWS::AccountId" }, "subnet/*"],
                ],
              },
              {
                "Fn::Join": [
                  ":",
                  [
                    "arn:aws:ec2:*",
                    { Ref: "AWS::AccountId" },
                    "network-interface/*",
                  ],
                ],
              },
              {
                "Fn::Join": [
                  ":",
                  ["arn:aws:ec2:*", { Ref: "AWS::AccountId" }, "instance/*"],
                ],
              },
              {
                "Fn::Join": [
                  ":",
                  ["arn:aws:ec2:*", { Ref: "AWS::AccountId" }, "volume/*"],
                ],
              },
              {
                "Fn::Join": [
                  ":",
                  [
                    "arn:aws:ec2:*",
                    { Ref: "AWS::AccountId" },
                    "security-group/*",
                  ],
                ],
              },
              "arn:aws:ec2:*::image/*",
            ],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    hello,
    listInstances,
    createInstance,
    startInstance,
    stopInstance,
    terminateInstance,
  },
};

module.exports = serverlessConfiguration;
