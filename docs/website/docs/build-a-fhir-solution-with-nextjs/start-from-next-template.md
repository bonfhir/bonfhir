---
sidebar_position: 1
title: Start from the Next template
description: Create the app from the next template
---

# Create from the Vite template

1. In a terminal, install and run package **@bonfhir/create-bonfhir**

   ```bash
   npm create -y bonfhir@latest
   ```

2. Provide a project name and select the **next** template:

   ![Vite Project Template](/img/docs/next-project-template.png)

:::info

This project template create a brand new [Next.js](https://nextjs.org/) application (with the new [app router](https://nextjs.org/docs#app-router-vs-pages-router)), and:

- add the required bonFHIR packages with [Mantine integration](https://mantine.dev/)
- update the [TypeScript configuration](/packages/intro#typescript-configuration)
- add the [NextAuth.js](https://next-auth.js.org/) package and configure it for authentication
- include a layout and a page to get started

:::
