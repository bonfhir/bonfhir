import { Coding } from "../fhir-types.codegen";
import { ValueFormatter, withValueFormatter } from "../formatters";
import { CodeFormatterOptions, codeFormatter } from "./code";

export interface CodingFormatterOptions {
  /** Default to "display". */
  style?:
    | "code"
    | "display"
    | "code-display"
    | "display-code"
    | null
    | undefined;

  /** Default to false. */
  includeSystem?: boolean | null | undefined;

  expansions?: CodeFormatterOptions["expansions"];
}

export const codingFormatter: ValueFormatter<
  "Coding",
  Coding | null | undefined,
  CodingFormatterOptions | null | undefined
> = {
  type: "Coding",
  format: (value, options, formatterOptions) => {
    if (!value) {
      return "";
    }

    const display =
      value.display?.trim() ||
      withValueFormatter<typeof codeFormatter>(
        formatterOptions.formatter
      ).format("code", value.code, { expansions: options?.expansions });

    let formattedValue;
    switch (options?.style || "display") {
      case "code": {
        formattedValue = value.code || "";
        break;
      }
      case "display": {
        formattedValue = display || value.code || "";
        break;
      }
      case "code-display": {
        formattedValue =
          display === value.code
            ? value.code || ""
            : `${value.code} (${display})`;
        break;
      }
      case "display-code": {
        formattedValue =
          display === value.code ? display || "" : `${display} (${value.code})`;
        break;
      }
    }

    if (!formattedValue) {
      return "";
    }

    return options?.includeSystem && value.system
      ? `${formattedValue} [${value.system}]`
      : formattedValue;
  },
};
