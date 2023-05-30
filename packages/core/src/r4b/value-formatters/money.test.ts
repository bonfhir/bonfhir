import { Money } from "../fhir-types.codegen.js";
import { Formatter } from "../formatters.js";
import { MoneyFormatterOptions, moneyFormatter } from "./money.js";

describe("money", () => {
  const formatter = new Formatter().register(moneyFormatter);

  it.each(<
    Array<[Money | undefined, MoneyFormatterOptions | undefined, string]>
  >[
    [
      {
        value: 123.23,
        currency: "CAD",
      },
      undefined,
      "CA$123.23",
    ],
    [
      {
        value: 123.23,
        currency: "EUR",
      },
      {
        notation: "compact-long",
      },
      "€123",
    ],
    [
      {
        value: 123.23,
        currency: "YEN",
      },
      {
        notation: "engineering",
        currencySign: "accounting",
        currencyDisplay: "name",
      },
      "123.23E0 YEN",
    ],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Money", value, options)).toEqual(expected);
  });
});
