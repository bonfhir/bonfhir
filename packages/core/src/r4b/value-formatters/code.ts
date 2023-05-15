import { ValueSetExpansionContains } from "../fhir-types.codegen";
import { ValueFormatter } from "../formatters";

/**
 * A FHIR code
 * Indicates that the value is taken from a set of controlled strings defined elsewhere (such as a value set)
 *
 * @see https://hl7.org/fhir/datatypes.html#code
 */
export interface CodeFormatterOptions {
  valueSetExpansions?:
    | ReadonlyArray<ValueSetExpansionContains>
    | null
    | undefined;
}

export const codeFormatter: ValueFormatter<
  "code",
  string | null | undefined,
  CodeFormatterOptions | null | undefined
> = {
  type: "code",
  format: (value, options) => {
    const trimmedValue = value?.trim() || "";

    if (!trimmedValue) return "";
    if (!options?.valueSetExpansions) return trimmedValue;

    const matchingCode = options.valueSetExpansions.find((element) => {
      return element?.code === trimmedValue;
    });

    return matchingCode?.display || trimmedValue;
  },
};
