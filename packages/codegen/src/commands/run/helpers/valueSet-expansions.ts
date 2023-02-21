import {
  Bundle,
  CodeSystem,
  CodeSystemConcept,
  ValueSet,
  ValueSetComposeInclude,
  ValueSetExpansionContains,
} from "fhir/r4";

/**
 * Expand a {@link ValueSet} from the exported FHIR definitions.
 *
 * @see https://hl7.org/fhir/valueset.html#expansion
 */
export const valueSetExpansions = (
  data: Record<string, Bundle<CodeSystem | ValueSet> | CodeSystem | ValueSet>,
  valueSetUrl: string
): ValueSetExpansionContains[] => {
  const valueSet = findValueSet(data, valueSetUrl);

  if (!valueSet) {
    throw new Error(
      `Unable to find ValueSet ${valueSetUrl} in the data provided.`
    );
  }

  if (valueSet.expansion?.contains?.length) {
    return valueSet.expansion.contains;
  }

  const result: ValueSetExpansionContains[] = [];

  for (const include of valueSet.compose?.include || []) {
    if (include.valueSet?.length) {
      for (const valueSetTargetUrl of include.valueSet) {
        const valueSetTarget = valueSetExpansions(data, valueSetTargetUrl);
        if (!valueSetTarget) {
          throw new Error(
            `Unable to process ValueSet include valueSet for ${valueSetUrl}: missing target valueSet ${valueSetTargetUrl}.`
          );
        }
        result.push(...valueSetTarget);
      }
      continue;
    }

    if (!include.system) {
      throw new Error(
        `Unable to process ValueSet include for ${valueSetUrl}: missing system.`
      );
    }

    const codeSystem = findCodeSystem(data, include.system);
    if (!codeSystem) {
      throw new Error(
        `Unable to find CodeSystem ${include.system} in the data provided (from ${valueSet.url}).`
      );
    }

    for (const concept of codeSystem.concept || []) {
      recursiveAdd(result, codeSystem, include, concept);
    }
  }

  return result;
};

function recursiveAdd(
  result: ValueSetExpansionContains[],
  codeSystem: CodeSystem,
  include: ValueSetComposeInclude,
  concept: CodeSystemConcept
) {
  if (conceptIsAllowedInValueSet(concept, include)) {
    result.push({
      system: codeSystem.url,
      code: concept.code,
      display: concept.display,
    });
    if (concept.concept?.length) {
      for (const childConcept of concept.concept) {
        recursiveAdd(result, codeSystem, include, childConcept);
      }
    }
  }
}

function findValueSet(
  data: Record<string, Bundle<CodeSystem | ValueSet> | CodeSystem | ValueSet>,
  url: string
): ValueSet | undefined {
  for (const dataFile of Object.values(data)) {
    if (dataFile.resourceType === "Bundle") {
      const valueSet = dataFile.entry?.find(
        (x) =>
          x?.resource?.resourceType === "ValueSet" && x?.resource?.url === url
      )?.resource as ValueSet | undefined;
      if (valueSet) {
        return valueSet;
      }
    }

    if (dataFile.resourceType === "ValueSet" && dataFile.url === url) {
      return dataFile;
    }
  }
  return undefined;
}

function findCodeSystem(
  data: Record<string, Bundle<CodeSystem | ValueSet> | CodeSystem | ValueSet>,
  url: string
): CodeSystem | undefined {
  for (const dataFile of Object.values(data)) {
    if (dataFile.resourceType === "Bundle") {
      const codeSystem = dataFile.entry?.find(
        (x) =>
          x?.resource?.resourceType === "CodeSystem" && x?.resource?.url === url
      )?.resource as CodeSystem | undefined;
      if (codeSystem) {
        return codeSystem;
      }
    }

    if (dataFile.resourceType === "CodeSystem" && dataFile.url === url) {
      return dataFile;
    }
  }
  return undefined;
}

function conceptIsAllowedInValueSet(
  concept: CodeSystemConcept,
  include: ValueSetComposeInclude
): boolean {
  if (!include.concept || include.concept.length === 0) {
    return true;
  }

  if (!include.concept?.map((x) => x.code).includes(concept.code)) {
    return false;
  }

  return true;
}
