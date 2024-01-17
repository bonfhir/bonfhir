import { ValueFormatter, withValueFormatter } from "../formatters";
import { FormattableIdentifier, identifierFormatter } from "./identifier";

export interface FormattableReference {
  display?: string | null | undefined;
  identifier?: FormattableIdentifier | null | undefined;
  reference?: string | null | undefined;
}

export const referenceFormatter: ValueFormatter<
  "Reference",
  FormattableReference | null | undefined,
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
        formatterOptions.formatter,
      ).format("Identifier", value.identifier) ||
      ""
    );
  },
};
