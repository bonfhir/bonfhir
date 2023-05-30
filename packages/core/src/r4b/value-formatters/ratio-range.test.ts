import { RatioRange } from "../fhir-types.codegen.js";
import { Formatter } from "../formatters.js";
import { codeFormatter } from "./code.js";
import { decimalFormatter } from "./decimal.js";
import { quantityFormatter } from "./quantity.js";
import { rangeFormatter } from "./range.js";
import {
  RatioRangeFormatterOptions,
  ratioRangeFormatter,
} from "./ratio-range.js";
import { ratioFormatter } from "./ratio.js";

describe("ratio-range", () => {
  const formatter = new Formatter()
    .register(ratioRangeFormatter)
    .register(ratioFormatter)
    .register(rangeFormatter)
    .register(quantityFormatter)
    .register(decimalFormatter)
    .register(codeFormatter);

  it.each(<
    Array<
      [RatioRange | undefined, RatioRangeFormatterOptions | undefined, string]
    >
  >[
    [
      {
        lowNumerator: { value: -1 },
        highNumerator: { value: 2.1 },
        denominator: { value: 2.3 },
      },
      undefined,
      "-1 … 2.1/2.3",
    ],
    [
      {
        lowNumerator: { value: -1, code: "L" },
        highNumerator: { value: 2.1, code: "L" },
        denominator: { value: 2.3, code: "h" },
      },
      {
        notation: "scientific",
      },
      "-1E0 … 2.1E0 L/2.3E0 h",
    ],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("RatioRange", value, options)).toEqual(expected);
  });
});
