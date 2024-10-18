import {
  ContactPoint,
  ContactPointSystem,
  ContactPointUse,
} from "@bonfhir/fhirtypes/r4b";
import {
  ValueFormatter,
  cleanUpCommonOptions,
  withValueFormatter,
} from "../formatters";
import { CodeFormatterOptions, codeFormatter } from "./code";
import { FormattablePeriod, periodFormatter } from "./period";

/**
 * Details for all kinds of technology-mediated contact points for a person or organization, including telephone, email, etc.
 *
 * @see https://hl7.org/fhir/datatypes.html#ContactPoint
 */
export interface ContactPointFormatterOptions {
  /**
   * - short: display the value only (default)
   * - medium: display the value and the use
   * - long: display the system, the value and the use
   * - full: display the rank, system, the value and the use
   */
  style?: "full" | "long" | "medium" | "short" | null | undefined;

  /**
   * The separator to use to join formatted contact point. Defaults to ", "
   */
  lineSeparator?: string | null | undefined;

  /**
   * When using a list of contact points, format only the first n (after sorting).
   * Default to Infinity to show or all contact point in a list.
   */
  max?: number | null | undefined;

  /**
   * When using a list of contact points:
   * - the sort order for the `use` attribute.
   * - the filter to select only specific values
   *
   * Defaults to [home, work, temp, old, mobile, undefined]
   */
  useFilterOrder?: Array<ContactPoint["use"]> | null | undefined;

  /**
   * When using a list of contact points, the options to pass to the Intl listFormat method.
   */
  listFormatOptions?: Intl.ListFormatOptions | undefined;

  systemExpansions?: CodeFormatterOptions["expansions"];

  useExpansions?: CodeFormatterOptions["expansions"];
}

export interface FormattableContactPoint {
  period?: FormattablePeriod | null | undefined;
  rank?: number | null | undefined;
  system?: ContactPointSystem | null | undefined;
  use?: ContactPointUse | null | undefined;
  value?: string | null | undefined;
}

export const contactPointFormatter: ValueFormatter<
  "ContactPoint",
  FormattableContactPoint | FormattableContactPoint[] | null | undefined,
  ContactPointFormatterOptions | null | undefined
> = {
  type: "ContactPoint",
  format: (value, options, formatterOptions) => {
    if (Array.isArray(value)) {
      const formattedContactPointList = filterAndSortContactPoints(
        value,
        options,
      )
        .map((contactPoint) =>
          withValueFormatter<typeof contactPointFormatter>(
            formatterOptions.formatter,
          ).format("ContactPoint", contactPoint, cleanUpCommonOptions(options)),
        )
        .filter(Boolean);

      return new Intl.ListFormat(
        formatterOptions.locale,
        options?.listFormatOptions,
      ).format(formattedContactPointList);
    }

    if (!value?.value) return "";

    const use = withValueFormatter<typeof codeFormatter>(
      formatterOptions.formatter,
    ).format("code", value.use, {
      expansions: options?.useExpansions,
    });
    const system = withValueFormatter<typeof codeFormatter>(
      formatterOptions.formatter,
    ).format("code", value.system, {
      expansions: options?.systemExpansions,
    });

    switch (options?.style) {
      // eslint-disable-next-line unicorn/no-null
      case null:
      case undefined:
      case "short": {
        return value.value;
      }
      case "medium": {
        return `${value.value} (${use})`;
      }
      case "long": {
        return `${system}: ${value.value} (${use})`;
      }
      case "full": {
        return [
          `${value.rank} - ${withValueFormatter<typeof periodFormatter>(
            formatterOptions.formatter,
          ).format("Period", value.period)}`,
          `${system}: ${value.value} (${use})`,
        ].join(options?.lineSeparator || ", ");
      }
      default: {
        throw new Error(`Unknown style option ${options?.style}`);
      }
    }
  },
};

function filterAndSortContactPoints(
  contactPoints: FormattableContactPoint[],
  options: ContactPointFormatterOptions | null | undefined,
) {
  const useFilterOrder =
    options?.useFilterOrder || DEFAULT_CONTACT_POINT_USE_ORDER_FILTER;
  const indexedOrder: { [k: string]: number } = Object.fromEntries(
    useFilterOrder.map((currentValue, index) => [
      currentValue || "undefined",
      index,
    ]),
  );

  // filter out by use
  if (options?.useFilterOrder)
    contactPoints = contactPoints.filter((contactPoint) =>
      useFilterOrder.includes(contactPoint.use ?? undefined),
    );

  contactPoints = contactPoints.sort((contactPoint1, contactPoint2) => {
    // sort rank
    if (
      (contactPoint1.rank || contactPoint2.rank) &&
      contactPoint1.rank !== contactPoint2.rank
    ) {
      if (contactPoint1.rank && !contactPoint2.rank) return -1;
      if (!contactPoint1.rank && contactPoint2.rank) return 1;
      return (contactPoint1.rank || 0) - (contactPoint2.rank || 0);
    }

    // then sort by use
    return (
      (indexedOrder[contactPoint1.use || "undefined"] || 0) -
      (indexedOrder[contactPoint2.use || "undefined"] || 0)
    );
  });

  if (options?.max) {
    contactPoints = contactPoints.slice(0, options.max);
  }

  return contactPoints;
}

const DEFAULT_CONTACT_POINT_USE_ORDER_FILTER: ContactPoint["use"][] = [
  "home",
  "work",
  "temp",
  "old",
  "mobile",
  undefined,
];
