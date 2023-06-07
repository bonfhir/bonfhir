/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
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
