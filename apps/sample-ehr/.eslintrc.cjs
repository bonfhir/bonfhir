/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  ignorePatterns: ["graphql-types.ts"],
  extends: ["@bonfhir/eslint-config", "plugin:@next/next/recommended"],
  rules: {
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          kebabCase: true,
        },
      },
    ],
  },
};
