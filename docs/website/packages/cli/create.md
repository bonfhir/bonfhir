---
sidebar_position: 1
title: Create a bonFHIR app
description: Create a new project using a template
---

### Usage

The `create` command can initialize a new FHIR application from a template.

This command can be invoked 2 different ways:

Using this package

```bash
npx @bonfhir/cli@latest create
```

Or using the create package for a nice shorthand syntax:

```
npm create bonfhir@latest
```

> The `@latest` is important as it makes sure that you are always using an up-to-date package.

### Flags

- `-n` / `--name`: the name of the project to create (which is alos the directoy name); must not contains any space (e.g. `my-awesome-fhir-project`)
- `-t` / `--template`: the [template](#available-templates) to use
- `-p` / `--package-manager`: the package manager to use (e.g. `npm`, `yarn` or `pnpm`)

### Available templates:

We currently offer the following templates:

- **playground**: A simple playground to get started playing with bonFHIR core; this create a somewhat REPL-like environment to play with [bonFHIR Core](/packages/core)
- **vite**: A [Vite](https://vitejs.dev/) React app with [BonFHIR React components](/packages/react) and [React-Router](https://reactrouter.com/)
- **lambda**: An AWS Lambda [serverless](https://www.serverless.com/framework) application
- **next**: A [Next.js](https://nextjs.org/) app with [BonFHIR React components](/packages/react), a [Subscription API](/packages/subscriptions), with [NextAuth](https://next-auth.js.org/) integration
- **monorepo**: A Monorepo with a Web app (Vite), an AWS Lambda API, and supporting packages - This for more advanced projects

### Included development FHIR server

All projects comes with a [local FHIR server setup](https://github.com/bonfhir/medplum-devbox) that can be used for development (if you have [Docker](https://www.docker.com/) installed).
Simply use the following command to launch it:

```bash npm2yarn
npm run fhir:start-server
```

Wait for a few minute for the server to start (you can look in the docker logs for a `Server started` statement).

Then open http://localhost:8100 and login using the default credentials:

- Username: `admin@example.com`
- Password: `medplum_admin`
- Project: "Default Project"

The following command will also launch [the import of synthetic patient data](/packages/cli/import) into the FHIR server

- using it while the server is running:

```bash npm2yarn
npm run fhir:add-sample-data
```
