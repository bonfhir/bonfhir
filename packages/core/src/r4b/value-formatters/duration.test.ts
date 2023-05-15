import { Duration, ValueSetExpansionContains } from "../fhir-types.codegen";
import { DEFAULT_FORMATTER } from "../formatters";
import { DurationFormatterOptions, durationFormatter } from "./duration";

describe("duration", () => {
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
  ])("format %p", (value, options, expected) => {
    expect(
      durationFormatter.format(value, options, {
        formatter: DEFAULT_FORMATTER,
      })
    ).toEqual(expected);
  });
});
