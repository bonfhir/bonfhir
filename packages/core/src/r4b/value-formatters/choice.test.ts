import { Condition } from "@bonfhir/fhirtypes/r4b";
import { Formatter } from "../formatters";
import { ChoiceFormatterOptions, choiceFormatter } from "./choice";
import { dateTimeFormatter } from "./date-time";
import { periodFormatter } from "./period";
import { stringFormatter } from "./string";

describe("choice", () => {
  const formatter = new Formatter()
    .register(choiceFormatter)
    .register(stringFormatter)
    .register(dateTimeFormatter)
    .register(periodFormatter);

  it.each([
    [{}, { prefix: "onset" }, ""],
    [{ onsetString: "some value" }, { prefix: "onset" }, "some value"],
    [{ onsetDateTime: "2021-02-03" }, { prefix: "onset" }, "2/3/2021"],
    [
      { onsetDateTime: "2021-02-03" },
      { prefix: "onset", options: { dateTime: { dateStyle: "full" } } },
      "Wednesday, February 3, 2021",
    ],
    [
      { onsetPeriod: { start: "2020-01-01", end: "2020-01-12" } },
      { prefix: "onset" },
      "1/1/2020 - 1/12/2020",
    ],
  ] satisfies Array<[Partial<Condition>, ChoiceFormatterOptions, string]>)(
    "format %p %p => %p",
    (value, options, expected) => {
      expect(formatter.format("choice", value, options)).toEqual(expected);
    },
  );

  it("throws when missing prefix", () => {
    expect(() => formatter.format("choice", {} as never, {})).toThrow(
      "Missing prefix - cannot format choice",
    );
  });
});
