import { Count, ValueSetExpansionContains } from "../fhir-types.codegen";
import { DEFAULT_FORMATTER } from "../formatters";
import { CountFormatterOptions, countFormatter } from "./count";

describe("count", () => {
  const expansions: ReadonlyArray<ValueSetExpansionContains> = [
    {
      code: "0",
      display: "cat",
    },
    {
      code: "1",
      display: "dog",
    },
  ];

  it.each(<
    Array<[Count | undefined, CountFormatterOptions | undefined, string]>
  >[
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
      "> -4.2E1 cat",
    ],
  ])("format %p", (value, options, expected) => {
    expect(
      countFormatter.format(value, options, {
        formatter: DEFAULT_FORMATTER,
      })
    ).toEqual(expected);
  });
});
