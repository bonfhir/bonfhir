import { Quantity, ValueSetExpansionContains } from "../fhir-types.codegen";
import { Formatter } from "../formatters";
import { codeFormatter } from "./code";
import { decimalFormatter } from "./decimal";
import { QuantityFormatterOptions, quantityFormatter } from "./quantity";

describe("quantity", () => {
  const formatter = new Formatter()
    .register(quantityFormatter)
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
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Quantity", value, options)).toEqual(expected);
  });
});
