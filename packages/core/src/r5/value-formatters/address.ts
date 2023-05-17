import { formatAddress } from "localized-address-format";
import { Address } from "../fhir-types.codegen";
import { ValueFormatter, withValueFormatter } from "../formatters";
import { comparePeriods } from "../lang-utils";
import { CodeFormatterOptions, codeFormatter } from "./code";
import { periodFormatter } from "./period";

/**
 * An address expressed using postal conventions
 *
 * @see https://hl7.org/fhir/datatypes.html#address
 */
export interface AddressFormatterOptions {
  /**
   * The default country to apply if missing from the address.
   */
  defaultCountry?: string | null | undefined;

  /**
   * Whether the country should be happened at the end of the address or not.
   * Defaults to false.
   */
  includeCountry?: boolean | null | undefined;

  /**
   * - standard: display the address without the use, type or period.
   * - full: display the address with the period
   * - extended: display the address with the use, type and period
   */
  style?: "standard" | "full" | "extended" | null | undefined;

  /**
   * True to use text if present, false to never use text - defaults to true
   */
  preferText?: boolean | null | undefined;

  /**
   * The separator to use to join formatted line addresses. Defaults to ", "
   */
  lineSeparator?: string | null | undefined;

  /**
   * When using a list of addresses, format only the first n (after sorting).
   * Default to Infinity to show or all addresses in a list.
   */
  max?: number | null | undefined;

  /**
   * When using a list of addresses:
   * - the sort order for the `use` attribute.
   * - the filter to select only specific values
   *
   * Defaults to [home, work, billing, temp, old, undefined]
   */
  useFilterOrder?: Array<Address["use"]> | null | undefined;

  /**
   * When using a list of addresses, the options to pass to the Intl listFormat method.
   */
  listFormatOptions?: Intl.ListFormatOptions | undefined;

  useValueSetExpansions?: CodeFormatterOptions["expansions"];

  typeValueSetExpansions?: CodeFormatterOptions["expansions"];
}

export const addressFormatter: ValueFormatter<
  "Address",
  Address | Address[] | null | undefined,
  AddressFormatterOptions | null | undefined
> = {
  type: "Address",
  format: (value, options, formatterOptions) => {
    if (!value) return "";

    if (Array.isArray(value)) {
      const formattedAddressList = filterAndSortAddresses(value, options)
        .map((address) =>
          withValueFormatter<typeof addressFormatter>(
            formatterOptions.formatter
          ).format("Address", address, options)
        )
        .filter(Boolean);

      return new Intl.ListFormat(
        formatterOptions.locale,
        options?.listFormatOptions
      ).format(formattedAddressList);
    }

    const country = value.country || options?.defaultCountry || undefined;
    const use = withValueFormatter<typeof codeFormatter>(
      formatterOptions.formatter
    ).format("code", value.use, {
      expansions: options?.useValueSetExpansions,
    });
    const type = withValueFormatter<typeof codeFormatter>(
      formatterOptions.formatter
    ).format("code", value.type, {
      expansions: options?.typeValueSetExpansions,
    });

    const fullAddress = formatAddress({
      postalCountry: country,
      administrativeArea: value.state,
      locality: value.city,
      dependentLocality: value.district,
      postalCode: value.postalCode,
      addressLines: value.line,
    });

    if (options?.preferText !== false && value.text) return value.text;

    const addressComponents = fullAddress;

    // add use and type
    if (options?.style === "extended")
      addressComponents.unshift(`${type} - ${use}`);

    // add period
    if (["full", "extended"].includes(options?.style || ""))
      addressComponents.unshift(
        `(${withValueFormatter<typeof periodFormatter>(
          formatterOptions.formatter
        ).format("Period", value.period)})`
      );

    // add country
    if (options?.includeCountry && country) addressComponents.push(country);

    return addressComponents
      .filter(Boolean)
      .join(options?.lineSeparator || ", ");
  },
};

const filterAndSortAddresses = (
  addresses: Address[],
  options: AddressFormatterOptions | null | undefined
): Address[] => {
  const useFilterOrder =
    options?.useFilterOrder || DEFAULT_ADDRESS_USE_ORDER_FILTER;
  const indexedOrder: { [k: string]: number } = Object.fromEntries(
    useFilterOrder.map((currentValue, index) => [
      currentValue || "undefined",
      index,
    ])
  );

  // filter out by use
  if (options?.useFilterOrder)
    addresses = addresses.filter((address) =>
      useFilterOrder.includes(address.use)
    );

  // sort out by period, then use
  addresses = addresses.sort((address1, address2) => {
    const periodComparisonResult = comparePeriods(address1, address2);

    if (periodComparisonResult) return periodComparisonResult;

    // then sort by use
    return (
      (indexedOrder[address1.use || "undefined"] || 0) -
      (indexedOrder[address2.use || "undefined"] || 0)
    );
  });

  if (options?.max) {
    addresses = addresses.slice(0, options.max);
  }

  return addresses;
};

const DEFAULT_ADDRESS_USE_ORDER_FILTER: Address["use"][] = [
  "home",
  "work",
  "temp",
  "old",
  "billing",
  undefined,
];
