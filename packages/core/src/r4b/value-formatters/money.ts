import { Currencies } from "@bonfhir/fhirtypes/r4b";
import "@formatjs/intl-numberformat/polyfill";
import { ValueFormatter } from "../formatters";

/**
 * An amount of currency.
 *
 * @see https://hl7.org/fhir/datatypes.html#money
 */
export type MoneyFormatterOptions = {
  /**
   * How to display the currency in currency formatting. The default is "symbol".
   *  - "symbol": use a localized currency symbol such as €.
   *  - "narrowSymbol": use a narrow format symbol ("$100" rather than "US$100").
   *  - "code": use the ISO currency code.
   *  - "name": use a localized currency name such as "dollar".
   */
  currencyDisplay?: undefined | "symbol" | "narrowSymbol" | "code" | "name";

  /**
   * In many locales, accounting format means to wrap the number with parentheses instead of appending a minus sign.
   * You can enable this formatting by setting the currencySign option to "accounting". The default value is "standard"
   */
  currencySign?: undefined | "accounting" | "standard";

  notation?:
    | "standard"
    | "scientific"
    | "engineering"
    | "compact-short"
    | "compact-long"
    | null
    | undefined;
};

export interface FormattableMoney {
  currency?: Currencies | null | undefined;
  value?: number | null | undefined;
}

export const moneyFormatter: ValueFormatter<
  "Money",
  FormattableMoney | null | undefined,
  MoneyFormatterOptions | null | undefined
> = {
  type: "Money",
  format: (value, options, formatterOptions) => {
    if (!value?.value) return "";

    const intlOptions: Intl.NumberFormatOptions = {
      style: "currency",
      currency: value.currency ?? undefined,
    };

    intlOptions.currencyDisplay = options?.currencyDisplay;
    intlOptions.currencySign = options?.currencySign;
    if (options?.notation) {
      if (
        options.notation === "compact-short" ||
        options.notation === "compact-long"
      ) {
        intlOptions.notation = "compact";
        intlOptions.compactDisplay =
          options.notation === "compact-long" ? "long" : "short";
      } else {
        intlOptions.notation = options.notation;
      }
    }

    return new Intl.NumberFormat(formatterOptions.locale, intlOptions).format(
      value.value,
    );
  },
};
