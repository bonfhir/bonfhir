import { FormattablePeriod, periodFormatter } from ".";
import { formatWithTokens } from "..";
import { HumanName, NameUse } from "@bonfhir/fhirtypes/r5";
import {
  ValueFormatter,
  cleanUpCommonOptions,
  withValueFormatter,
} from "../formatters";
import { CodeFormatterOptions, codeFormatter } from "./code";

/**
 * A name of a human with text, parts and usage information.
 *
 * @see https://hl7.org/fhir/datatypes.html#humanName
 */
export interface HumanNameFormatterOptions {
  /**
   * - shorter: first given name
   * - short: first given name and family name
   * - standard: all given name and family name
   * - medium: prefix, first given name and family name
   * - long: prefix, all given name and family name
   * - full: prefix, all given name, family name and suffix
   */
  style?:
    | "full"
    | "long"
    | "medium"
    | "standard"
    | "short"
    | "shorter"
    | null
    | undefined;

  /**
   * Instead of picking a style, use the templated string to format human names.
   * Use '{tokens}' to insert the tokens.
   * Tokens can be any HumanName attribute, +:
   *  - firstGiven: first given name,
   *  - initials: all given initials,
   *  - remainingInitials: all given initials except the first one,
   *
   * e.g.:
   *
   * "{{family}} {{firstGiven}} ({{remainingInitials}})"
   */
  template?: string | null | undefined;

  /**
   * If present, send text regardless of the style. Defaults to true
   */
  preferText?: boolean | null | undefined;

  /**
   * Whether we should include the use or not. Defaults to false
   **/
  includeUse?: boolean | null | undefined;

  /**
   * When using a list of names:
   * - the sort order for the `use` attribute.
   * - the filter to select only specific values
   *
   * Defaults to [usual, official, temp, nickname, anonymous, old, maiden, undefined]
   */
  useFilterOrder?: Array<NameUse> | null | undefined;

  /**
   * When using a list of names, format only the first n (after sorting).
   * Default to Infinity to show or all names in a list.
   */
  max?: number | null | undefined;

  /**
   * When using a list of names, the options to pass to the Intl listFormat method.
   */
  listFormatOptions?: Intl.ListFormatOptions | undefined;

  /**
   * ValueSet expansions for "use"
   */
  expansions?: CodeFormatterOptions["expansions"];
}

export interface FormattableHumanName {
  family?: string | null | undefined;
  given?: string[] | null | undefined;
  period?: FormattablePeriod | null | undefined;
  prefix?: string[] | null | undefined;
  suffix?: string[] | null | undefined;
  text?: string | null | undefined;
  use?: NameUse | null | undefined;
}

export const humanNameFormatter: ValueFormatter<
  "HumanName",
  FormattableHumanName | FormattableHumanName[] | null | undefined,
  HumanNameFormatterOptions | null | undefined
> = {
  type: "HumanName",
  format: (value, options, formatterOptions) => {
    if (!value) return "";

    if (Array.isArray(value)) {
      const formattedHumanNameList = filterAndSortHumanNames(value, options)
        .map((humanName) =>
          withValueFormatter<typeof humanNameFormatter>(
            formatterOptions.formatter,
          ).format("HumanName", humanName, cleanUpCommonOptions(options)),
        )
        .filter(Boolean);

      return new Intl.ListFormat(
        formatterOptions.locale,
        options?.listFormatOptions,
      ).format(formattedHumanNameList);
    }

    if (options?.preferText !== false && value.text) return value.text;

    if (options?.template) {
      return formatWithTokens(options.template, {
        use: withValueFormatter<typeof codeFormatter>(
          formatterOptions.formatter,
        ).format("code", value.use, {
          expansions: options?.expansions,
        }),
        family: value.family || "",
        given: new Intl.ListFormat(
          formatterOptions.locale,
          options?.listFormatOptions,
        ).format(value.given || []),
        prefix: new Intl.ListFormat(
          formatterOptions.locale,
          options?.listFormatOptions,
        ).format(value.prefix || []),
        suffix: new Intl.ListFormat(
          formatterOptions.locale,
          options?.listFormatOptions,
        ).format(value.suffix || []),
        period: withValueFormatter<typeof periodFormatter>(
          formatterOptions.formatter,
        ).format("Period", value.period),
        firstGiven: value.given?.[0] || "",
        initials: (value.given || []).map((given) => `${given[0]}.`).join(" "),
        remainingInitials: (value.given || [])
          .slice(1)
          .map((given) => `${given[0]}.`)
          .join(" "),
      }).replaceAll(/\s+/g, " ");
    }

    let nameComponents: Array<string | null | undefined>;

    switch (options?.style) {
      case "full": {
        nameComponents = [
          ...(value.prefix || []),
          value.family,
          ...(value.given || []),
          ...(value.suffix || []),
        ];
        break;
      }
      case "long": {
        nameComponents = [
          ...(value.prefix || []),
          value.family,
          ...(value.given || []),
        ];
        break;
      }
      case "medium": {
        nameComponents = [
          ...(value.prefix || []),
          value.family,
          value.given?.[0],
        ];
        break;
      }
      case "standard": {
        nameComponents = [...(value.given || []), value.family];
        break;
      }
      // eslint-disable-next-line unicorn/no-null
      case null:
      case undefined:
      case "short": {
        nameComponents = [value.given?.[0], value.family];
        break;
      }
      case "shorter": {
        nameComponents = [value.given?.[0] || ""];
        break;
      }
      default: {
        throw new Error(`Unknown style option ${options?.style}`);
      }
    }

    if (options?.includeUse) {
      const use = withValueFormatter<typeof codeFormatter>(
        formatterOptions.formatter,
      ).format("code", value.use, {
        expansions: options?.expansions,
      });

      if (use) nameComponents.push(`(${use})`);
    }

    return nameComponents.filter(Boolean).join(" ");
  },
};

function filterAndSortHumanNames(
  humanNames: FormattableHumanName[],
  options: HumanNameFormatterOptions | null | undefined,
) {
  const useFilterOrder =
    options?.useFilterOrder || DEFAULT_HUMAN_NAME_USE_ORDER_FILTER;
  const indexedOrder: { [k: string]: number } = Object.fromEntries(
    useFilterOrder.map((currentValue, index) => [
      currentValue || "undefined",
      index,
    ]),
  );

  // filter out by use
  if (options?.useFilterOrder)
    humanNames = humanNames.filter((humanName) =>
      useFilterOrder.includes(humanName.use ?? undefined),
    );

  // sort by use
  humanNames.sort((humanName1, humanName2) => {
    return (
      (indexedOrder[humanName1.use || "undefined"] || 0) -
      (indexedOrder[humanName2.use || "undefined"] || 0)
    );
  });

  if (options?.max) {
    humanNames = humanNames.slice(0, options.max);
  }

  return humanNames;
}

const DEFAULT_HUMAN_NAME_USE_ORDER_FILTER: HumanName["use"][] = [
  "official",
  "usual",
  "temp",
  "nickname",
  "anonymous",
  "old",
  "maiden",
  undefined,
];
