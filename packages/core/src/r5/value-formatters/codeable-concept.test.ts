import { CodeableConcept } from "../fhir-types.codegen.js";
import { Formatter } from "../formatters.js";
import { codeFormatter } from "./code.js";
import {
  CodeableConceptFormatterOptions,
  codeableConceptFormatter,
} from "./codeable-concept.js";
import { codingFormatter } from "./coding.js";

describe("codeable-concept", () => {
  const formatter = new Formatter()
    .register(codeableConceptFormatter)
    .register(codingFormatter)
    .register(codeFormatter);

  it.each(<
    Array<
      [
        CodeableConcept | undefined,
        CodeableConceptFormatterOptions | undefined,
        string
      ]
    >
  >[
    [undefined, undefined, ""],
    [{ text: "The text" }, undefined, "The text"],
    [{ text: "The text" }, { preferText: false }, "The text"],
    [{ coding: [{ code: "0" }], text: "The text" }, { preferText: false }, "0"],
    [
      {
        coding: [{ code: "0" }, { code: "1", userSelected: true }],
        text: "The text",
      },
      { preferText: false },
      "1",
    ],
    [
      {
        coding: [
          { code: "0" },
          { code: "1", userSelected: true },
          { display: "The display", userSelected: true },
        ],
        text: "The text",
      },
      { preferText: false },
      "1 and The display",
    ],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("CodeableConcept", value, options)).toEqual(
      expected
    );
  });
});
