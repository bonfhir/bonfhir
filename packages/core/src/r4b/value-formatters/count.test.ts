import { Count, ValueSetExpansionContains } from "@bonfhir/fhirtypes/r4b";
import { Formatter } from "../formatters";
import { codeFormatter } from "./code";
import { CountFormatterOptions, countFormatter } from "./count";
import { decimalFormatter } from "./decimal";

describe("count", () => {
  const formatter = new Formatter()
    .register(countFormatter)
    .register(decimalFormatter)
    .register(codeFormatter);

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
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Count", value, options)).toEqual(expected);
  });
});
