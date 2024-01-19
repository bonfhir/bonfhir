import { Identifier, IdentifierUse } from "../fhir-types.codegen";
import {
  ValueFormatter,
  cleanUpCommonOptions,
  withValueFormatter,
} from "../formatters";
import { comparePeriods, formatValueWithPattern } from "../lang-utils";
import { CodeFormatterOptions, codeFormatter } from "./code";
import {
  FormattableCodeableConcept,
  codeableConceptFormatter,
} from "./codeable-concept";
import { FormattablePeriod, periodFormatter } from "./period";

/**
 * A numeric or alphanumeric string that is associated with a single object or entity within a given system.
 *
 * @see https://hl7.org/fhir/datatypes.html#identifier
 */
export interface IdentifierFormatterOptions {
  style?: "full" | "long" | "medium" | "short" | "value" | null | undefined;

  /**
   * A dictionary of system as key, and system labels as value
   */
  systemsLabels?: Record<string, string> | null | undefined;

  /**
   * When using a list of identifiers:
   * - the sort order for the `use` attribute.
   * - the filter to select only specific values
   *
   * Defaults to [usual, official, temp, secondary, old, undefined]
   */
  useFilterOrder?: Array<Identifier["use"]> | null | undefined;

  /**
   * When using a list of identifiers:
   * - the sort order for the `system` attribute.
   * - the filter to select only specific values
   *
   * no default (no order and none filtered out)
   */
  systemFilterOrder?: Array<Identifier["system"]> | null | undefined;

  /**
   * When using a list of identifiers, format only the first n (after sorting).
   * Default to Infinity to show or all identifiers in a list.
   */
  max?: number | null | undefined;

  /**
   * When using a list of identifiers, the options to pass to the Intl listFormat method.
   */
  listFormatOptions?: Intl.ListFormatOptions | undefined;

  expansions?: CodeFormatterOptions["expansions"];

  /**
   * Optional pattern, or mapping of system and patterns. Formats the value according to the pattern when provided.
   * When pattern = false, the value is not formatted.
   * Otherwise, the value is formatted with the provided pattern, or with a default pattern (see {@link DEFAULT_SYSTEMS_PATTERNS}) if not provided.
   * `#` is the template character. It can be escaped with a double backslash.
   *
   * @example
   * // returns "123-456-7890"
   * valueTypeAdapter.format(identifier, { pattern: "###-###-####" })
   * @example
   * An us-mbi identifier will not be formatted with the default system pattern
   * // returns "1EG4-TE5-MK73"
   * valueTypeAdapter.format(identifier)
   * @example
   * Identifier with "https://fhir.nhs.uk/Id/nhs-number"  as system using the provided system:pattern mapping
   * // returns "123 456 7890"
   * valueTypeAdapter.format(identifier, { pattern: { "https://fhir.nhs.uk/Id/nhs-number": "### ### ####" } })
   */
  pattern?: string | Record<string, string> | false | null | undefined;

  /**
   * A dictionary of system as key, and system patterns as value
   */
  systemsPatterns?: Record<string, string> | null | undefined;
}

export interface FormattableIdentifier {
  period?: FormattablePeriod | null | undefined;
  system?: string | null | undefined;
  type?: FormattableCodeableConcept | null | undefined;
  use?: IdentifierUse | null | undefined;
  value?: string | null | undefined;
}

export const identifierFormatter: ValueFormatter<
  "Identifier",
  FormattableIdentifier | FormattableIdentifier[] | null | undefined,
  IdentifierFormatterOptions | null | undefined
> = {
  type: "Identifier",
  format: (value, options, formatterOptions) => {
    if (Array.isArray(value)) {
      const formattedIdentifierList = filterAndSortIdentifiers(value, options)
        .map((identifier) =>
          withValueFormatter<typeof identifierFormatter>(
            formatterOptions.formatter,
          ).format("Identifier", identifier, cleanUpCommonOptions(options)),
        )
        .filter(Boolean);

      return new Intl.ListFormat(
        formatterOptions.locale,
        options?.listFormatOptions,
      ).format(formattedIdentifierList);
    }

    if (!value?.value) return "";

    const use = withValueFormatter<typeof codeFormatter>(
      formatterOptions.formatter,
    ).format("code", value.use, {
      expansions: options?.expansions,
    });

    const type = withValueFormatter<typeof codeableConceptFormatter>(
      formatterOptions.formatter,
    ).format("CodeableConcept", value.type);

    const period = withValueFormatter<typeof periodFormatter>(
      formatterOptions.formatter,
    ).format("Period", value.period);

    const finalSystemsLabels =
      options?.systemsLabels ??
      formatterOptions.systemsLabels ??
      DEFAULT_SYSTEMS_LABELS;

    const system =
      finalSystemsLabels?.[value.system || "undefined"] || value.system;

    const pattern =
      options?.pattern === false
        ? undefined
        : options?.pattern == undefined
          ? options?.systemsPatterns
            ? options.systemsPatterns[value.system || ""] || ""
            : DEFAULT_SYSTEMS_PATTERNS[value.system || ""] || ""
          : typeof options?.pattern === "string"
            ? options.pattern
            : options?.pattern[system || ""] || "";

    const patternFormattedValue: string | undefined =
      options?.pattern === false
        ? undefined
        : formatValueWithPattern(value.value, pattern || "");

    const identifierValue: string = patternFormattedValue || value.value;

    switch (options?.style) {
      case "value": {
        return identifierValue;
      }
      // eslint-disable-next-line unicorn/no-null
      case null:
      case undefined:
      case "short": {
        return `${system ? system + ": " : ""}${identifierValue}`;
      }
      case "medium": {
        return `${system ? system + ": " : ""}${identifierValue} (${use})`;
      }
      case "long": {
        return `${
          system ? system + ": " : ""
        }${identifierValue}\n${use} - ${type}`;
      }
      case "full": {
        return `[${period}]\n${
          system ? system + ": " : ""
        }${identifierValue}\n${use} - ${type}`;
      }
      default: {
        throw new Error(`Unknown style option ${options?.style}`);
      }
    }
  },
};

function filterAndSortIdentifiers(
  identifiers: FormattableIdentifier[],
  options: IdentifierFormatterOptions | null | undefined,
) {
  const useFilterOrder =
    options?.useFilterOrder || DEFAULT_IDENTIFIER_USE_ORDER;
  const useIndexedOrder: { [k: string]: number } = Object.fromEntries(
    useFilterOrder.map((currentValue, index) => [
      currentValue || "undefined",
      index,
    ]),
  );

  // eslint-disable-next-line unicorn/no-null
  const systemFilterOrder = options?.systemFilterOrder || null;
  const systemIndexedOrder: { [k: string]: number } | null =
    systemFilterOrder &&
    Object.fromEntries(
      systemFilterOrder.map((currentValue, index) => [
        currentValue || "undefined",
        index,
      ]),
    );

  // filter out by use
  if (useFilterOrder)
    identifiers = identifiers.filter((identifier) =>
      useFilterOrder.includes(identifier.use ?? undefined),
    );

  // filter out by system
  if (systemFilterOrder)
    identifiers = identifiers.filter((identifier) =>
      systemFilterOrder?.includes(identifier.system ?? undefined),
    );

  // sort out by period, then system, then use
  identifiers = identifiers.sort((identifier1, identifier2) => {
    const periodComparisonResult = comparePeriods(identifier1, identifier2);

    if (periodComparisonResult) return periodComparisonResult;

    // then sort by system

    const systemComparison =
      (systemIndexedOrder?.[identifier1.use || "undefined"] || 0) -
      (systemIndexedOrder?.[identifier2.use || "undefined"] || 0);

    if (systemComparison) return systemComparison;

    // then sort by use
    return (
      (useIndexedOrder[identifier1.use || "undefined"] || 0) -
      (useIndexedOrder[identifier2.use || "undefined"] || 0)
    );
  });

  if (options?.max) {
    identifiers = identifiers.slice(0, options.max);
  }

  return identifiers;
}

/**
 * The default order use to sort identifiers.
 */
export const DEFAULT_IDENTIFIER_USE_ORDER: Identifier["use"][] = [
  "official",
  "usual",
  "temp",
  "secondary",
  "old",
  undefined,
];

/**
 * Default values for `systemsLabels`.
 */
export const DEFAULT_SYSTEMS_LABELS: Required<
  IdentifierFormatterOptions["systemsLabels"]
> = {
  "urn:ietf:rfc:3986": "URI",
  "urn:dicom:uid": "DICOM",
  "http://hl7.org/fhir/sid/us-ssn": "SSN",
  "http://hl7.org/fhir/sid/us-medicare": "Medicare Number",
  "http://hl7.org/fhir/sid/us-mbi": "MBI",
  "http://hl7.org/fhir/sid/us-npi": "NPI",
  "https://www.gs1.org/gtin": "GTIN",
};

/**
 * Default values for `systemsPatterns`.
 */
export const DEFAULT_SYSTEMS_PATTERNS: Required<Record<string, string>> = {
  "http://hl7.org/fhir/sid/us-ssn": "###-##-###",
  "http://hl7.org/fhir/sid/us-mbi": "####-###-####",
};
