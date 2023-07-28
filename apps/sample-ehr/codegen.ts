import type { CodegenConfig } from "@graphql-codegen/cli";

export default {
  documents: "src/**/*.graphql",
  schema: {
    // "http://localhost:8103/fhir/R4/$graphql": {
    //   headers: {
    //     Authorization:
    //       "Basic ZjU0MzcwZGUtZWFmMy00ZDgxLWExN2UtMjQ4NjBmNjY3OTEyOjc1ZDhlN2QwNmJmOTI4MzkyNmM1MWQ1ZjQ2MTI5NWNjZjBiNjkxMjhlOTgzYjZlY2RkNWE5YzA3NTA2ODk1ZGU=",
    //   },
    // },
    "fhir-schema.graphql.json": {},
  },
  generates: {
    // "fhir-schema.graphql.json": {
    //   plugins: ["introspection"],
    //   config: {
    //     minify: true,
    //   },
    // },
    "src/graphql-types.ts": {
      plugins: ["typescript"],
      config: {
        maybeValue: "T | undefined",
      },
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "graphql-types.ts",
      },
      plugins: ["typescript-operations", "typed-document-node"],
      config: {
        maybeValue: "T | undefined",
      },
    },
  },
  hooks: {
    afterOneFileWrite: ["prettier --write"],
  },
  overwrite: true,
  emitLegacyCommonJSImports: false,
} satisfies CodegenConfig;
