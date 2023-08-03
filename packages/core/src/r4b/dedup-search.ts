import { AnyResource, Identifier } from "./fhir-types.codegen";
import { asArray } from "./lang-utils";
import { FhirSearchBuilder } from "./search";
import { fhirSearch } from "./search.codegen";

/**
 * A rule for how to search for a resource.
 */
export interface DedupSearchRule {
  /**
   * The resource attribute to search for.
   */
  attribute: string;

  /**
   * The type of search to perform.
   */
  type: FilterParamKeys<keyof FhirSearchBuilder>;

  /**
   * The name of the parameter to use for the search, if different from the attribute name.
   */
  parameter?: string | null | undefined;
}

export type DedupSearchRules = Record<
  string,
  | DedupSearchRule
  | Array<DedupSearchRule>
  | ((search: FhirSearchBuilder, resource: AnyResource) => FhirSearchBuilder)
>;

/**
 * Default rules for how to search for resources duplication.
 */
export const DEFAULT_DEDUP_SEARCH_RULES: DedupSearchRules = {
  Condition: [
    {
      attribute: "code",
      type: "tokenParam",
    },
    {
      attribute: "subject",
      type: "referenceParam",
    },
    {
      attribute: "encounter",
      type: "referenceParam",
    },
    {
      attribute: "recordedDate",
      type: "dateParam",
    },
    {
      attribute: "recorder",
      type: "referenceParam",
    },
  ],
  DiagnosticReport: [
    {
      attribute: "effectiveDateTime",
      type: "dateParam",
    },
    {
      attribute: "code",
      type: "tokenParam",
    },
    {
      attribute: "subject",
      type: "referenceParam",
    },
    {
      attribute: "encounter",
      type: "referenceParam",
    },
    {
      attribute: "performer",
      type: "referenceParam",
    },
  ],
  Medication: {
    attribute: "code",
    type: "tokenParam",
  },
  Observation: [
    {
      attribute: "code",
      type: "tokenParam",
    },
    {
      attribute: "subject",
      type: "referenceParam",
    },
    {
      attribute: "encounter",
      type: "referenceParam",
    },
    {
      attribute: "effectiveDateTime",
      type: "dateParam",
      parameter: "date",
    },
    {
      attribute: "effectiveInstant",
      type: "dateParam",
      parameter: "date",
    },
    {
      attribute: "effectivePeriod",
      type: "dateParam",
      parameter: "date",
    },
    {
      attribute: "effectiveTiming",
      type: "dateParam",
      parameter: "date",
    },
    {
      attribute: "performer",
      type: "referenceParam",
    },
  ],
  Organization: {
    attribute: "name",
    type: "stringParam",
  },
};

/**
 * Create a search query to find resources that are functional duplicates of a resource.
 * This is meant to be able to deduplicate resources that are imported multiple times.
 *
 * Default rules are applied, but you should probably define your own to make sure de-duplication
 * happens as expected.
 */
export function fhirDedupSearch(
  resource: AnyResource,
  rules?: DedupSearchRules | null | undefined,
): FhirSearchBuilder | undefined {
  if (hasIdentifier(resource)) {
    return fhirSearch().tokenParam("identifier", resource.identifier);
  }

  const foundRules = (rules || DEFAULT_DEDUP_SEARCH_RULES)[
    resource.resourceType
  ];
  if (!foundRules) {
    return;
  }

  let search = fhirSearch();
  if (typeof foundRules === "function") {
    search = foundRules(search, resource);
  } else {
    for (const rule of asArray(foundRules)) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      (search[rule.type] as any)(
        rule.parameter ?? rule.attribute,
        (resource as any)[rule.attribute],
      );
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }
  }

  return search.href ? search : undefined;
}

export type FilterParamKeys<T extends PropertyKey> =
  T extends `${infer _U}Param` ? T : never;

function hasIdentifier(
  value: AnyResource,
): value is AnyResource & { identifier: Identifier[] } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value as any).identifier?.length > 0;
}
