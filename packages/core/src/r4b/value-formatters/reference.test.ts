import { Reference } from "../fhir-types.codegen.js";
import { Formatter } from "../formatters.js";
import { codeFormatter } from "./code.js";
import { codeableConceptFormatter } from "./codeable-concept.js";
import { codingFormatter } from "./coding.js";
import { identifierFormatter } from "./identifier.js";
import { periodFormatter } from "./period.js";
import { referenceFormatter } from "./reference.js";

describe("reference", () => {
  const formatter = new Formatter()
    .register(referenceFormatter)
    .register(identifierFormatter)
    .register(codeFormatter)
    .register(codingFormatter)
    .register(codeableConceptFormatter)
    .register(periodFormatter);

  it.each(<Array<[Reference | undefined, string]>>[
    [undefined, ""],
    [{}, ""],
    [{ display: "Acme, Inc." }, "Acme, Inc."],
    [{ display: "Acme, Inc.", reference: "Organization/0" }, "Acme, Inc."],
    [{ reference: "Organization/0" }, "Organization/0"],
    [
      {
        identifier: {
          system: "urn:ietf:rfc:3986",
          value: "http://pas-server/xxx/Patient/443556",
        },
      },
      "URI: http://pas-server/xxx/Patient/443556",
    ],
  ])("format %p => %p", (value, expected) => {
    expect(formatter.format("Reference", value)).toEqual(expected);
  });
});
