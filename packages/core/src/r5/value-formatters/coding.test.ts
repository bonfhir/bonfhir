import { Coding } from "../fhir-types.codegen.js";
import { Formatter } from "../formatters.js";
import { codeFormatter } from "./code.js";
import { CodingFormatterOptions, codingFormatter } from "./coding.js";

describe("coding", () => {
  const formatter = new Formatter()
    .register(codingFormatter)
    .register(codeFormatter);

  it.each(<
    Array<[Coding | undefined, CodingFormatterOptions | undefined, string]>
  >[
    [undefined, undefined, ""],
    [
      {
        code: "0",
        display: "Cat",
      },
      undefined,
      "Cat",
    ],
    [
      {
        code: "0",
      },
      undefined,
      "0",
    ],
    [
      {
        code: "0",
      },
      { style: "code-display" },
      "0",
    ],
    [
      {
        code: "0",
        display: "Cat",
      },
      { style: "code" },
      "0",
    ],
    [
      {
        code: "0",
        display: "Cat",
      },
      { style: "code-display" },
      "0 (Cat)",
    ],
    [
      {
        code: "0",
        display: "Cat",
      },
      { style: "display-code" },
      "Cat (0)",
    ],
    [
      {
        code: "0",
        display: "Cat",
      },
      { style: "display-code", includeSystem: true },
      "Cat (0)",
    ],
    [
      {
        code: "0",
        display: "Cat",
        system: "http://hl7.org/fhir/sid/icd-10",
      },
      { style: "display-code", includeSystem: true },
      "Cat (0) [http://hl7.org/fhir/sid/icd-10]",
    ],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Coding", value, options)).toEqual(expected);
  });
});
