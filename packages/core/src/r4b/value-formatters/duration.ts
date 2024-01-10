import { ValueSetExpansionContains } from "../fhir-types.codegen";
import { ValueFormatter } from "../formatters";
import {
  FormattableQuantity,
  QuantityFormatterOptions,
  quantityFormatter,
} from "./quantity";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#duration
 */
export type DurationFormatterOptions = QuantityFormatterOptions;

export const durationFormatter: ValueFormatter<
  "Duration",
  FormattableQuantity | null | undefined,
  DurationFormatterOptions | null | undefined
> = {
  type: "Duration",
  format: (value, options, formatterOptions) => {
    options ||= {};
    if (!options.expansions) {
      options.expansions =
        formatterOptions?.durationExpansions || DEFAULT_DURATION_EXPANSIONS;
    }
    return quantityFormatter.format(value, options, formatterOptions);
  },
};

const DEFAULT_DURATION_EXPANSIONS: ValueSetExpansionContains[] = [
  {
    code: "a",
    display: "year(s)",
  },
  {
    code: "mo",
    display: "month(s)",
  },
  {
    code: "wk",
    display: "week(s)",
  },
  {
    code: "d",
    display: "day(s)",
  },
  {
    code: "h",
    display: "hour(s)",
  },
  {
    code: "min",
    display: "minute(s)",
  },
  {
    code: "s",
    display: "second(s)",
  },
  {
    code: "ms",
    display: "millisecond(s)",
  },
];
