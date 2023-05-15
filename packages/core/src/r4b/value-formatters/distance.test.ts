import { Distance, ValueSetExpansionContains } from "../fhir-types.codegen";
import { DEFAULT_FORMATTER } from "../formatters";
import { DistanceFormatterOptions, distanceFormatter } from "./distance";

describe("distance", () => {
  const expansions: ReadonlyArray<ValueSetExpansionContains> = [
    {
      code: "0",
      display: "km",
    },
    {
      code: "1",
      display: "inches",
    },
  ];

  it.each(<
    Array<[Distance | undefined, DistanceFormatterOptions | undefined, string]>
  >[
    [
      {
        value: -42.3,
        code: "0",
        comparator: ">",
      },
      {
        expansions: expansions,
        notation: "scientific",
      },
      "> -4.23E1 km",
    ],
  ])("format %p", (value, options, expected) => {
    expect(
      distanceFormatter.format(value, options, {
        formatter: DEFAULT_FORMATTER,
      })
    ).toEqual(expected);
  });
});
