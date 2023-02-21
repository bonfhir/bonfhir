/**
 * Return the immediate path for a FHIR [Element Definition](https://hl7.org/fhir/elementdefinition.html#ElementDefinition)
 * `path` property.
 *
 * - if there is more than one sub path, return undefined.
 * - if there is an indexer, return undefined
 *
 * @example
 *  "Account.id" -> id
 *  "Patient.contact.name" -> undefined
 *  "Patient.multipleBirth[x]" -> undefined
 */
export const elementImmediatePath = (path: string | null | undefined) => {
  if (!path) {
    return;
  }

  const splitted = path.split(".");
  if (splitted.length > 2) {
    return;
  }

  const resolvedImmediatePath = splitted[1];
  if (resolvedImmediatePath?.includes("[")) {
    return;
  }

  return resolvedImmediatePath;
};
