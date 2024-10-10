import { Ratio } from "@bonfhir/fhirtypes/r5";
import { Formatter } from "../formatters";
import { codeFormatter } from "./code";
import { decimalFormatter } from "./decimal";
import { quantityFormatter } from "./quantity";
import { RatioFormatterOptions, ratioFormatter } from "./ratio";

describe("ratio", () => {
  const formatter = new Formatter()
    .register(ratioFormatter)
    .register(quantityFormatter)
    .register(decimalFormatter)
    .register(codeFormatter);

  it.each(<
    Array<[Ratio | undefined, RatioFormatterOptions | undefined, string]>
  >[
    [
      {
        numerator: {
          value: 3.3,
        },
        denominator: {
          value: 5,
        },
      },
      undefined,
      "3.3/5",
    ],
    [
      {
        numerator: {
          value: 1,
        },
        denominator: {
          value: 128,
        },
      },
      {
        denominatorSeparator: ":",
      },
      "1:128",
    ],
    [
      {
        numerator: {
          value: 15,
          unit: "g",
        },
        denominator: {
          value: 1,
          unit: "ml",
        },
      },
      undefined,
      "15 g/ml",
    ],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Ratio", value, options)).toEqual(expected);
  });
});
