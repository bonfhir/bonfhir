import type { AWS } from "@serverless/typescript";

// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  service: "lambda",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
  },
  functions: {
    subscriptions: {
      handler: "src/subscriptions/index.handler",
      events: [
        {
          httpApi: {
            path: "/fhir/subscriptions/{endpoint+}",
            method: "post",
          },
        },
      ],
    },
  },
  plugins: ["serverless-plugin-typescript", "serverless-offline"],
  custom: {
    "serverless-offline": {
      httpPort: 6000,
      host: "0.0.0.0",
    },
  },
} satisfies AWS;
