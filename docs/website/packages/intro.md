---
sidebar_position: 0
---

# Introduction

## Packages organization and scope

bonFHIR is composed of a series of packages. Some have dependencies with one another.  
The idea is that you can only pull in what you need in your implementation.  
Some packages are client-side only, some are server-side only, and some are both:

- Client and Server; these can be leveraged in all parts of the stack:

  - [`@bonfhir/core`](/packages/core)
  - `@bonfhir/us-core`
  - `@bonfhir/next`

- Client - they are reserved to client application:

  - [`@bonfhir/query`](/packages/query)
  - [`@bonfhir/react`](/packages/react)
  - [`@bonfhir/mantine`](/packages/react/mantine)
  - `@bonfhir/gluestack-ui`

- Server:

  - [`@bonfhir/subscriptions`](/packages/subscriptions)
  - [`@bonfhir/aws-lambda`](/packages/subscriptions/aws-lambda)

- Utilities - not meant for inclusion in a project:
  - [`@bonfhir/cli`](/packages/cli)
  - [`create-bonfhir`](/packages/cli/create) (subset of `@bonfhir/cli`)
  - `@bonfhir/codegen`

## Package formats

Most of the packages actually includes 4 versions:

- they support FHIR versions [R4B](https://hl7.org/fhir/R4B/index.html) and [R5](https://hl7.org/fhir/R5/index.html)
- they are bundled as either CommonJS or ESM

The application bundler determines whether to use the CommonJS or ESM version, using [Conditional exports](https://nodejs.org/api/packages.html#conditional-exports).  
The import path in the typescript files determines whether to use the R4B or R5:

```typescript
import { ... } from "@bonfhir/core/r4b";
import { ... } from "@bonfhir/core/r5";
```

The functionality should be mostly equivalent between FHIR versions - only the type definitions change.

Also - take note that bonFHIR only supports Node v18+ - the [FHIR Client](/packages/core/fhir-client) in particular relies on the availability
of the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in the environment.

## Typescript configuration

In order for typescript to work properly, some configuration is required.
Here are the recommended settings to have in your `tsconfig.json`:

```json
{
  "module": "ES2022",
  "moduleResolution": "Bundler",
  "target": "ES2022"
}
```

The most important one here is the [`moduleResolution` field](https://www.typescriptlang.org/tsconfig#moduleResolution):
it needs to be either 'node16', 'nodenext' or 'bundler' in order to properly support [Conditional exports](https://nodejs.org/api/packages.html#conditional-exports).

The "bundler" setting needs to work in conjunction with an external bundler
(which means that typescript is only used for type checking, not bundling the application).

We recommend that you use our project templates to get started with the correct settings.  
To use them, simply run `npm create bonfhir` on your command-line.
