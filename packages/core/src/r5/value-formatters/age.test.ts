import { Age, ValueSetExpansionContains } from "../fhir-types.codegen";
import { Formatter } from "../formatters";
import { AgeFormatterOptions, ageFormatter } from "./age";
import { codeFormatter } from "./code";
import { decimalFormatter } from "./decimal";

describe("age", () => {
  const formatter = new Formatter()
    .register(ageFormatter)
    .register(decimalFormatter)
    .register(codeFormatter);

  const expansions: ReadonlyArray<ValueSetExpansionContains> = [
    {
      code: "0",
      display: "year",
    },
    {
      code: "1",
      display: "days",
    },
  ];

  it.each(<Array<[Age | undefined, AgeFormatterOptions | undefined, string]>>[
    [
      {
        value: -42,
        code: "0",
        comparator: ">",
      },
      {
        expansions,
        notation: "scientific",
      },
      "> -4.2E1 year",
    ],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Age", value, options)).toEqual(expected);
  });
});
