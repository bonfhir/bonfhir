import { Duration, ValueSetExpansionContains } from "../fhir-types.codegen";
import { Formatter } from "../formatters";
import { codeFormatter } from "./code";
import { decimalFormatter } from "./decimal";
import { DurationFormatterOptions, durationFormatter } from "./duration";

describe("duration", () => {
  const formatter = new Formatter()
    .register(durationFormatter)
    .register(decimalFormatter)
    .register(codeFormatter);

  const expansions: ReadonlyArray<ValueSetExpansionContains> = [
    {
      code: "0",
      display: "seconds",
    },
    {
      code: "1",
      display: "milliseconds",
    },
  ];

  it.each(<
    Array<[Duration | undefined, DurationFormatterOptions | undefined, string]>
  >[
    [
      {
        value: -42.3,
        code: "1",
        comparator: ">",
      },
      {
        expansions: expansions,
        notation: "scientific",
      },
      "> -4.23E1 milliseconds",
    ],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Duration", value, options)).toEqual(expected);
  });
});
