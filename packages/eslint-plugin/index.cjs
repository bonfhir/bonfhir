const { name, version } = require("./package.json");

module.exports = {
  meta: {
    name,
    version,
  },
  rules: {
    "ensure-correct-fhir-version": require("./ensure-correct-fhir-version.cjs"),
  },
};
