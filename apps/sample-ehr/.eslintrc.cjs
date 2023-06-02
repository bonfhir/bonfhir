/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ["@bonfhir/eslint-config", "plugin:@next/next/recommended"],
  globals: {
    "process"
  }
};
