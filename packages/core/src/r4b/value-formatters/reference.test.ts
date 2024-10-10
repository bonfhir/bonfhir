import { Reference } from "@bonfhir/fhirtypes/r4b";
import { Formatter } from "../formatters";
import { codeFormatter } from "./code";
import { codeableConceptFormatter } from "./codeable-concept";
import { codingFormatter } from "./coding";
import { identifierFormatter } from "./identifier";
import { periodFormatter } from "./period";
import { referenceFormatter } from "./reference";

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
