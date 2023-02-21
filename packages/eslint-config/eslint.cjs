/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:lodash/recommended",
    "plugin:unicorn/recommended",
    "eslint-config-prettier",
  ],
  ignorePatterns: [
    "**/{.cache,.parcel-cache,coverage,dist,dist-ladle,node_modules}/*",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin", "lodash", "unicorn"],
  root: true,
  rules: {
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
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
    "lodash/prefer-lodash-method": "off",
    "lodash/prefer-lodash-typecheck": "off",
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
        ignore: [
          /codeableConcept/,
          /dateTime/,
          /fhirPath/,
          /ratioRange/,
          /simpleQuantity/,
          /valueSet/,
        ],
      },
    ],
    "unicorn/explicit-length-check": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-await-expression-member": "off",
    "unicorn/prefer-number-properties": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/switch-case-braces": "off",
  },
};
