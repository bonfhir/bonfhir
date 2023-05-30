import { Quantity } from "../fhir-types.codegen.js";
import { Formatter } from "../formatters.js";
import { codeFormatter } from "./code.js";
import { decimalFormatter } from "./decimal.js";
import { QuantityFormatterOptions, quantityFormatter } from "./quantity.js";

describe("quantity", () => {
  const formatter = new Formatter()
    .register(quantityFormatter)
    .register(decimalFormatter)
    .register(codeFormatter);

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
        code: "ml",
        comparator: ">",
        system: "http://unitsofmeasure.org",
      },
      {
        notation: "scientific",
      },
      "> -4.246E1 ml",
    ],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Quantity", value, options)).toEqual(expected);
  });
});
