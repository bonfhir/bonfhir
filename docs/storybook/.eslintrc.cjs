/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ["@bonfhir/eslint-config", "plugin:storybook/recommended"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "unicorn/filename-case": "off",
    "unicorn/better-regex": "off",
  },
};
