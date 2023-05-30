// @ts-check

const fhirVersionRegex = /^r[0-9][a-z]?$/;

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that the correct FHIR version is imported and coherent",
      recommended: true,
    },
    fixable: "code",
  },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const currentFhirVersion = context
          .getFilename()
          .split("/")
          .find((segment) => fhirVersionRegex.test(segment));
        if (!currentFhirVersion) {
          return;
        }
        if (typeof node.source.value !== "string") {
          return;
        }

        const fhirVersionInImport = node.source.value
          .split("/")
          .find((segment) => fhirVersionRegex.test(segment));

        if (!fhirVersionInImport) {
          return;
        }

        if (currentFhirVersion !== fhirVersionInImport) {
          context.report({
            node,
            message: `The FHIR version in the import (${fhirVersionInImport}) does not match the FHIR version in the file path (${currentFhirVersion})`,
            fix: function (fixer) {
              return fixer.replaceText(
                node.source,
                // @ts-ignore
                `"${node.source.value.replace(
                  fhirVersionInImport,
                  currentFhirVersion
                )}"`
              );
            },
          });
        }
      },
    };
  },
};
