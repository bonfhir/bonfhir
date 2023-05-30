import { HumanName, NameUse } from "../fhir-types.codegen.js";
import { ValueFormatter, withValueFormatter } from "../formatters.js";
import { CodeFormatterOptions, codeFormatter } from "./code.js";

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

export const humanNameFormatter: ValueFormatter<
  "HumanName",
  HumanName | HumanName[] | null | undefined,
  HumanNameFormatterOptions | null | undefined
> = {
  type: "HumanName",
  format: (value, options, formatterOptions) => {
    if (!value) return "";

    if (Array.isArray(value)) {
      const formattedHumanNameList = filterAndSortHumanNames(value, options)
        .map((humanName) =>
          withValueFormatter<typeof humanNameFormatter>(
            formatterOptions.formatter
          ).format("HumanName", humanName, options)
        )
        .filter(Boolean);

      return new Intl.ListFormat(
        formatterOptions.locale,
        options?.listFormatOptions
      ).format(formattedHumanNameList);
    }

    if (options?.preferText !== false && value.text) return value.text;

    let nameComponents: Array<string | undefined>;

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
        formatterOptions.formatter
      ).format("code", value.use, {
        expansions: options?.expansions,
      });

      if (use) nameComponents.push(`(${use})`);
    }

    return nameComponents.filter(Boolean).join(" ");
  },
};

const filterAndSortHumanNames = (
  humanNames: HumanName[],
  options: HumanNameFormatterOptions | null | undefined
): HumanName[] => {
  const useFilterOrder =
    options?.useFilterOrder || DEFAULT_HUMAN_NAME_USE_ORDER_FILTER;
  const indexedOrder: { [k: string]: number } = Object.fromEntries(
    useFilterOrder.map((currentValue, index) => [
      currentValue || "undefined",
      index,
    ])
  );

  // filter out by use
  if (options?.useFilterOrder)
    humanNames = humanNames.filter((humanName) =>
      useFilterOrder.includes(humanName.use)
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
};

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
