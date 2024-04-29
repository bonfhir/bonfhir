import { Remarkable } from "remarkable";
import { ValueFormatter } from "../formatters";

let remarkable: Remarkable | undefined;
function htmlRenderer(opts?: Remarkable.Options): Remarkable {
  if (!remarkable) remarkable = new Remarkable(opts);
  return remarkable;
}

/**
 * A FHIR string (see above) that may contain markdown syntax for optional processing
 * by a markdown presentation engine
 *
 * @see https://hl7.org/fhir/datatypes.html#markdown
 */

export interface MarkdownFormatterOptions {
  /** Default to original. */
  style?: "original" | "bareString" | "html" | null | undefined;
}

export const markdownFormatter: ValueFormatter<
  "markdown",
  string | null | undefined,
  MarkdownFormatterOptions | null | undefined
> = {
  type: "markdown",
  format: (value, options) => {
    if (!value) return "";

    switch (options?.style) {
      case "bareString": {
        return htmlRenderer()
          .render(value)
          .replaceAll(/<\/?[^>]+(>|$)/gi, "")
          .trim();
      }
      case "html": {
        return htmlRenderer().render(value).trim();
      }
      // eslint-disable-next-line unicorn/no-null
      case null:
      case undefined:
      case "original": {
        return value;
      }
    }
  },
};
