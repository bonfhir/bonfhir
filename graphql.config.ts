import type { IGraphQLConfig } from "graphql-config";

export default {
  projects: {
    "sample-ehr": {
      documents: ["apps/sample-ehr/**/*.graphql"],
      schema: [
        {
          "http://localhost:8103/fhir/R4/$graphql": {
            headers: {
              Authorization:
                "Basic ZjU0MzcwZGUtZWFmMy00ZDgxLWExN2UtMjQ4NjBmNjY3OTEyOjc1ZDhlN2QwNmJmOTI4MzkyNmM1MWQ1ZjQ2MTI5NWNjZjBiNjkxMjhlOTgzYjZlY2RkNWE5YzA3NTA2ODk1ZGU=",
            },
          },
        },
      ],
    },
  },
} satisfies IGraphQLConfig;
