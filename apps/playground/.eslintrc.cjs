/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ["@bonfhir/eslint-config"],
  rules: {
    "unicorn/no-empty-file": "off",
    "unicorn/prefer-top-level-await": "off",
  },
};
