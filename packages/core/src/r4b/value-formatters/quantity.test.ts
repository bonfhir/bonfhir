import { Quantity, ValueSetExpansionContains } from "../fhir-types.codegen";
import { DEFAULT_FORMATTER } from "../formatters";
import { QuantityFormatterOptions, quantityFormatter } from "./quantity";

describe("quantity", () => {
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
    Array<[Quantity | undefined, QuantityFormatterOptions | undefined, string]>
  >[
    [
      {
        value: 3.3,
      },
      undefined,
      "3.3",
    ],
    [
      {
        value: -42.46,
        code: "0",
        comparator: ">",
      },
      {
        expansions: expansions,
        notation: "scientific",
      },
      "> -4.246E1 cat",
    ],
  ])("format %p", (value, options, expected) => {
    expect(
      quantityFormatter.format(value, options, {
        formatter: DEFAULT_FORMATTER,
      })
    ).toEqual(expected);
  });
});
