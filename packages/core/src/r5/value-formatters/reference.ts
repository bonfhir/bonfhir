import { Reference } from "../fhir-types.codegen.js";
import { ValueFormatter, withValueFormatter } from "../formatters.js";
import { identifierFormatter } from "./identifier.js";

export const referenceFormatter: ValueFormatter<
  "Reference",
  Reference | null | undefined,
  null | undefined
> = {
  type: "Reference",
  format: (value, _, formatterOptions) => {
    if (!value) {
      return "";
    }

    return (
      value.display?.trim() ||
      value.reference?.trim() ||
      withValueFormatter<typeof identifierFormatter>(
        formatterOptions.formatter
      ).format("Identifier", value.identifier) ||
      ""
    );
  },
};
