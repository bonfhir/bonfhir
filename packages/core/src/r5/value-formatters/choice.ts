import { CommonFormatterOptions, ValueFormatter } from "../formatters";

/**
 * Handles Choice of Datatypes attributes
 * Invokes the appropriate formatter based on the type of the value.
 *
 * @see https://hl7.org/fhir/formats.html#choice
 */
export interface ChoiceFormatterOptions {
  /**
   * The common prefix (constant) for all the choices.
   */
  prefix: string;

  /**
   * Formatter-specific options, passed to the formatter when formatting the value.
   *
   * @example
   *
   * { dateTime: { dateStyle: "MM/DD/YYYY" } }
   */
  options?: Record<string, unknown>;
}

export const choiceFormatter: ValueFormatter<
  "choice",
  object | null | undefined,
  ChoiceFormatterOptions
> = {
  type: "choice",
  format: (value, options, formatterOptions) => {
    if (!options?.prefix) {
      throw new Error("Missing prefix - cannot format choice");
    }

    if (!value) {
      return "";
    }

    for (const [key, choice] of Object.entries(value).filter(([k]) =>
      k.startsWith(options.prefix),
    )) {
      // eslint-disable-next-line unicorn/no-null
      if (choice != null) {
        const suffix = key.slice(options.prefix.length);
        const suffixCapitalized =
          suffix.charAt(0).toUpperCase() + suffix.slice(1);
        if (formatterOptions.formatter.canFormat(suffixCapitalized)) {
          return formatterOptions.formatter.format(
            suffixCapitalized,
            choice as never,
            options?.options?.[suffixCapitalized] as CommonFormatterOptions,
          );
        }

        const suffixUncapitalized =
          suffix.charAt(0).toLowerCase() + suffix.slice(1);
        if (formatterOptions.formatter.canFormat(suffixUncapitalized)) {
          return formatterOptions.formatter.format(
            suffixUncapitalized,
            choice as never,
            options?.options?.[suffixUncapitalized] as CommonFormatterOptions,
          );
        }
      }
    }

    return "";
  },
};
