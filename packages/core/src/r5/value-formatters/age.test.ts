import { Age, ValueSetExpansionContains } from "../fhir-types.codegen";
import { DEFAULT_FORMATTER } from "../formatters";
import { AgeFormatterOptions, ageFormatter } from "./age";

describe("age", () => {
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
  ])("format %p", (value, options, expected) => {
    expect(
      ageFormatter.format(value, options, {
        formatter: DEFAULT_FORMATTER,
      })
    ).toEqual(expected);
  });
});
