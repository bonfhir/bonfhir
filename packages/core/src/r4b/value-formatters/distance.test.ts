import { Distance, ValueSetExpansionContains } from "../fhir-types.codegen.js";
import { Formatter } from "../formatters.js";
import { codeFormatter } from "./code.js";
import { decimalFormatter } from "./decimal.js";
import { DistanceFormatterOptions, distanceFormatter } from "./distance.js";

describe("distance", () => {
  const formatter = new Formatter()
    .register(distanceFormatter)
    .register(decimalFormatter)
    .register(codeFormatter);

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
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Distance", value, options)).toEqual(expected);
  });
});
