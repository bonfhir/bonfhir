---
sidebar_position: 1
title: Start from the AWS Lambda template
description: Create the app from the lambda template
---

1. In a terminal, run the following command

   ```bash
   npm create -y bonfhir@latest
   ```

2. Provide a project name and select the **lambda** template with the **Medplum** FHIR Server:

   ![Lambda Project Template](/img/docs/lambda-project-template.png)

:::info

This project template create a brand new [serverless](https://serverless.com/framework/) application, and:

- add the required bonFHIR packages for [subscription management](/packages/subscriptions)
- update the [TypeScript configuration](/packages/intro#typescript-configuration)
- add the [serverless-esbuild](https://www.serverless.com/plugins/serverless-esbuild) and [serverless-offline](https://www.serverless.com/plugins/serverless-offline)
  packages and configure them for running the lambdas locally

:::

3. `cd` into the new project and open it in your favorite editor
