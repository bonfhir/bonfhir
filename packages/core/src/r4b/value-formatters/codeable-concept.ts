import { CodeableConcept } from "../fhir-types.codegen";
import { ValueFormatter, withValueFormatter } from "../formatters";
import { CodingFormatterOptions, codingFormatter } from "./coding";

/**
 * A CodeableConcept represents a value that is usually supplied by
 *  providing a reference to one or more terminologies or ontologies but
 *  may also be defined by the provision of text.
 * This is a common pattern in healthcare data.
 *
 * @see https://hl7.org/fhir/datatypes.html#CodeableConcept
 */
export interface CodeableConceptFormatterOptions
  extends CodingFormatterOptions {
  /** Default to true. */
  preferText?: boolean | null | undefined;

  /** The list format options to use when there are multiple codings. */
  listFormatOptions?: Intl.ListFormatOptions | undefined;
}

export const codeableConceptFormatter: ValueFormatter<
  "CodeableConcept",
  CodeableConcept | null | undefined,
  CodeableConceptFormatterOptions | null | undefined
> = {
  type: "CodeableConcept",
  format: (value, options, formatterOptions) => {
    if (!value) {
      return "";
    }

    if (options?.preferText !== false && value.text) {
      return value.text;
    }

    let codings = value.coding?.filter((coding) => coding.userSelected) || [];
    if (codings.length === 0) {
      codings = value.coding || [];
    }

    if (codings.length === 0) {
      return value.text || "";
    } else if (codings.length === 1) {
      return withValueFormatter<typeof codingFormatter>(
        formatterOptions.formatter,
      ).format("Coding", codings[0], options);
    }

    return new Intl.ListFormat(
      formatterOptions.locale,
      options?.listFormatOptions,
    ).format(
      codings.map((coding) =>
        withValueFormatter<typeof codingFormatter>(
          formatterOptions.formatter,
        ).format("Coding", coding, options),
      ),
    );
  },
};
