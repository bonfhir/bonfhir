---
title: Setup GraphQL in a bonFHIR project
description: Type-safe graphql at your fingertips
---

This guide will walk you through adding support for typesafe GraphQL in a bonFHIR project.

:::info

Although it is possible to [use GraphQL in a bonFHIR project without any particular setup](/packages/core/fhir-client#graphql),
we recommend that you go through the steps described here as it will provide type safety and even type completion which
will greatly enhance the developer experience.

:::

It is based on the [GraphQL Code Generator installation guide](https://the-guild.dev/graphql/codegen/docs/getting-started).

It assumes that you already have a functionning bonFHIR application, and a [FHIR Server that supports GraphQL](https://hl7.org/fhir/graphql.html).  
If you don't have one, you can start with one of our project templates by running:

```bash
npm create -y bonfhir@latest
```

## Install the GraphQL Code Generator

At the root of the project, start by installing the right packages:

```bash npm2yarn
npm install graphql
npm install -D @graphql-codegen/cli @parcel/watcher
```

Then, run the initialization wizard

```bash
npx graphql-code-generator init
```

Select the following options:

- What type of application are you building? **Application built with React**
- Where is your schema?: (path or url) **[location of your FHIR Server schema] - use "http://localhost:8103/fhir/R4/$graphql" if you are using the [provided FHIR local development server](/docs/build-a-fhir-app-with-react/setup-fhir-server)**
- Where are your operations and fragments?: **`src/**/\*.tsx`\*\*
- Where to write the output: **`src/gql/`**
- Do you want to generate an introspection file? **Yes**
- How to name the config file? **`codegen.ts`**
- What script in package.json should run the codegen? **`codegen`**

Then install the configured plugins:

```bash npm2yarn
npm install
```

## Configure the GraphQL Code Generator

Open the `codegen.ts` file - it should look like this:

```typescript title="codegen.ts"
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8103/fhir/R4/$graphql",
  documents: "src/**/*.tsx",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
```

There are a few things that you may need to fix:

1. Ensure that your FHIR Server is running nad the introspection endpoint is available  
   _(run the `npm fhir:start-server` command in a project created from a bonFHIR template)_

2. Your FHIR Server introspection endpoint may need authentication information; this is the case for our [provided FHIR local development server](/docs/build-a-fhir-app-with-react/setup-fhir-server)  
   If this is the case you can add the authentication info like so:

   ```typescript title="codegen.ts"
   import type { CodegenConfig } from "@graphql-codegen/cli";

   const config: CodegenConfig = {
     overwrite: true,
     schema: {
       "http://localhost:8103/fhir/R4/$graphql": {
         headers: {
           Authorization:
             "Basic ZjU0MzcwZGUtZWFmMy00ZDgxLWExN2UtMjQ4NjBmNjY3OTEyOjc1ZDhlN2QwNmJmOTI4MzkyNmM1MWQ1ZjQ2MTI5NWNjZjBiNjkxMjhlOTgzYjZlY2RkNWE5YzA3NTA2ODk1ZGU=",
         },
       },
     },
     documents: "src/*_/_.tsx",
     generates: {
       "src/gql/": {
         preset: "client",
         plugins: [],
       },
       "./graphql.schema.json": {
         plugins: ["introspection"],
       },
     },
   };

   export default config;
   ```

3. Ignore errors when there is no documents (`ignoreNoDocuments: true`):

   ```typescript title="codegen.ts"
   import type { CodegenConfig } from "@graphql-codegen/cli";

   const config: CodegenConfig = {
     overwrite: true,
     schema: {
       "http://localhost:8103/fhir/R4/$graphql": {
         headers: {
           Authorization:
             "Basic ZjU0MzcwZGUtZWFmMy00ZDgxLWExN2UtMjQ4NjBmNjY3OTEyOjc1ZDhlN2QwNmJmOTI4MzkyNmM1MWQ1ZjQ2MTI5NWNjZjBiNjkxMjhlOTgzYjZlY2RkNWE5YzA3NTA2ODk1ZGU=",
         },
       },
     },
     documents: "src/*_/_.tsx",
     generates: {
       "src/gql/": {
         preset: "client",
         plugins: [],
       },
       "./graphql.schema.json": {
         plugins: ["introspection"],
       },
     },
     ignoreNoDocuments: true,
   };

   export default config;
   ```

4. Run the codegen script

   ```bash npm2yarn
   npm run codegen
   ```

   This should create a file named `graphql.schema.json` at the root of the project; it is a dump of the GraphQL introspection endpoint.  
   It also create a directory named `./src/gql` that we will use later.

5. Use the local introspection file instead of the online one  
   You can keep using the server introspection point, but we do recommend that you switch to the one you just generated
   as it make life easier for everyone (including other developers and CI servers); this way they don't need a locally
   running FHIR Server to run GraphQL codegen tasks:

   ```typescript title="codegen.ts"
   import type { CodegenConfig } from "@graphql-codegen/cli";

   const config: CodegenConfig = {
     overwrite: true,
     // schema: {
     //   "http://localhost:8103/fhir/R4/$graphql": {
     //     headers: {
     //       Authorization:
     //         "Basic ZjU0MzcwZGUtZWFmMy00ZDgxLWExN2UtMjQ4NjBmNjY3OTEyOjc1ZDhlN2QwNmJmOTI4MzkyNmM1MWQ1ZjQ2MTI5NWNjZjBiNjkxMjhlOTgzYjZlY2RkNWE5YzA3NTA2ODk1ZGU=",
     //     },
     //   },
     // },
     schema: "./graphql.schema.json",
     documents: "src/**/*.tsx",
     generates: {
       "src/gql/": {
         preset: "client",
         plugins: [],
       },
       // "./graphql.schema.json": {
       //   plugins: ["introspection"],
       // },
     },
     ignoreNoDocuments: true,
   };

   export default config;
   ```

## Configure typescript language server to auto-complete the GraphQL schema

This step is optional but greatly recommended - it will provide type suggestions / completions inside your GraphQL
queries, making them much easier to write!

:::info

There are others plugins or extensions available for this - you may prefer using your own technique for this part.

:::

1. Install the LSP

   ```bash npm2yarn
   npm install -D @0no-co/graphqlsp
   ```

2. Update the `tsconfig.json` file with the right options:

   ```json title="tsconfig.json"
   {
     "compilerOptions": {
       //...
       "plugins": [
         {
           "name": "@0no-co/graphqlsp",
           "schema": "./graphql.schema.json",
           "template": "graphql",
           "templateIsCallExpression": true
         }
       ]
     }
   }
   ```

3. If using Visual Studio Code, make sure to use the project typescript  
    Add (or edit) a file named `.vscode/settings.json` with the following options:

   ```json title=".vscode/settings.json"
   {
     "typescript.tsdk": "node_modules/typescript/lib",
     "typescript.enablePromptUseWorkspaceTsdk": true
   }
   ```

   Immediately after saving this file, you should get prompt asking you to use the workspace typescript - answer **Allow**

## Write your first GraphQL query

Let's write our first GraphQL query!

1. In a component file in your project (or a new file), **type** the following code:

   ```tsx
   import { useFhirGraphQL } from "@bonfhir/query/r4b";
   import { graphql } from "./gql"; // The `./src/gql` directory created earlier

   function MyComponent() {
     const patientsQuery = useFhirGraphQL(
       graphql(`
         query PatientsQuery {
           PatientList {
             id
             name {
               given
               family
             }
           }
         }
       `),
     );
   }
   ```

   You should notice 2 things:

   - you have type completion support for your GraphQL query
   - typescript reports a type error on the `graphql` call saying it can't find the appropriate type

2. Run the codegen script again

   ```bash npm2yarn
   npm run codegen
   ```

   You'll notice that the typescript error has disappeared - your GraphQL query is now fully typed!

3. Continue developping and enjoy a typed GraphQL experience!

   ```tsx
   import { useFhirGraphQL } from "@bonfhir/query/r4b";
   import { graphql } from "./gql"; // The `./src/gql` directory created earlier

   function MyComponent() {
     const patientsQuery = useFhirGraphQL(
       graphql(`
         query PatientsQuery {
           PatientList {
             id
             name {
               given
               family
             }
           }
         }
       `),
     );

     return (
       <List>
         {patientsQuery.data?.PatientList?.map((patient) => (
           <List.Item key={patient?.id}>
             <FhirValue type="HumanName" value={patient?.name} />
           </List.Item>
         ))}
       </List>
     );
   }
   ```

   You will need to run the `codegen` script everytime you change a GraphQL query.  
   It can be run in watch mode by running this:

   ```bash npm2yarn
   npm run codegen -- --watch
   ```
