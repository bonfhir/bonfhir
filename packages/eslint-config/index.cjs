/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "plugin:unicorn/recommended",
    "turbo",
  ],
  ignorePatterns: [
    "**/{.cache,.parcel-cache,coverage,dist,node_modules}/*",
    "**/storybook-static",
    "dist",
    ".eslintrc.cjs",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin", "@bonfhir/eslint-plugin"],
  root: true,
  rules: {
    // https://stackoverflow.com/a/64067915/5397051
    // Allow unused params if they start with _
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    // forbid usage of unused variables (marked with an _)
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["parameter", "variable"],
        leadingUnderscore: "forbid",
        format: null,
      },
      {
        selector: "parameter",
        leadingUnderscore: "require",
        format: null,
        modifiers: ["unused"],
      },
    ],
    "@typescript-eslint/no-empty-interface": "off",
    "turbo/no-undeclared-env-vars": "off",
    "unicorn/import-style": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-nested-ternary": "off",
    "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
    "unicorn/prevent-abbreviations": "off",
    "@bonfhir/ensure-correct-fhir-version": "error",
  },
};
