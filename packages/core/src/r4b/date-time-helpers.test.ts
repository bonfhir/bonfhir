import { now, today } from "./date-time-helpers.js";

describe("date-time-helpers", () => {
  it.each([undefined, "America/New_York", "Australia/Queensland"])(
    "today %p",
    (timeZone) => {
      const result = today(timeZone);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  );

  it.each([undefined, "America/New_York", "Australia/Queensland"])(
    "now %p",
    (timeZone) => {
      const result = now(timeZone);
      expect(result).toMatch(
        /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([\sT]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([,.]\d+(?!:))?)?(\17[0-5]\d([,.]\d+)?)?([Zz]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
      );
    }
  );
});
