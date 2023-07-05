import {
  duration,
  now,
  parseFhirDateTime,
  today,
} from "./date-time-helpers.js";

describe("date-time-helpers", () => {
  it.each([undefined, "America/New_York", "Australia/Queensland"])(
    "today %p",
    (timeZone) => {
      const result = today(timeZone);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(parseFhirDateTime(result)).toMatchObject({
        flavour: "date",
      });
    }
  );

  it.each([undefined, "America/New_York", "Australia/Queensland"])(
    "now %p",
    (timeZone) => {
      const result = now(timeZone);
      expect(result).toMatch(
        /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([\sT]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([,.]\d+(?!:))?)?(\17[0-5]\d([,.]\d+)?)?([Zz]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
      );
      expect(parseFhirDateTime(result)).toMatchObject({
        flavour: "dateTime",
      });
    }
  );

  it.each([
    [undefined, { flavour: "NA" }],
    ["", { flavour: "NA" }],
    ["garbage", { flavour: "NA" }],
    ["23", { flavour: "NA" }],
    ["2023", { flavour: "year", year: 2023, date: expect.any(Date) }],
    [
      "2023-02",
      { flavour: "year-month", year: 2023, month: 2, date: expect.any(Date) },
    ],
    [
      "2023-02-05",
      {
        flavour: "date",
        year: 2023,
        month: 2,
        day: 5,
        date: expect.any(Date),
      },
    ],
    [
      "2023-02-05Tsdfg",
      {
        flavour: "NA",
      },
    ],
    [
      "2023-07-05T12:16:56Z",
      {
        flavour: "dateTime",
        year: 2023,
        month: 7,
        day: 5,
        hours: 12,
        minutes: 16,
        seconds: 56,
        milliseconds: undefined,
        timeZone: "Z",
        date: expect.any(Date),
      },
    ],
    [
      "2023-07-05 12:16:56Z",
      {
        flavour: "dateTime",
        year: 2023,
        month: 7,
        day: 5,
        hours: 12,
        minutes: 16,
        seconds: 56,
        milliseconds: undefined,
        timeZone: "Z",
        date: expect.any(Date),
      },
    ],
    [
      "2023-07-05 12:16:56",
      {
        flavour: "dateTime",
        year: 2023,
        month: 7,
        day: 5,
        hours: 12,
        minutes: 16,
        seconds: 56,
        milliseconds: undefined,
        timeZone: undefined,
        date: expect.any(Date),
      },
    ],
    [
      "2023-07-05T12:16:56.914Z",
      {
        flavour: "dateTime",
        year: 2023,
        month: 7,
        day: 5,
        hours: 12,
        minutes: 16,
        seconds: 56,
        milliseconds: 914,
        timeZone: "Z",
        date: expect.any(Date),
      },
    ],
    [
      "2023-07-05T08:20:28.667-04:00",
      {
        flavour: "dateTime",
        year: 2023,
        month: 7,
        day: 5,
        hours: 8,
        minutes: 20,
        seconds: 28,
        milliseconds: 667,
        timeZone: "-04:00",
        date: expect.any(Date),
      },
    ],
    [
      "2023-07-05T22:25:06.243+10:00",
      {
        flavour: "dateTime",
        year: 2023,
        month: 7,
        day: 5,
        hours: 22,
        minutes: 25,
        seconds: 6,
        milliseconds: 243,
        timeZone: "+10:00",
        date: expect.any(Date),
      },
    ],
  ])("parseDateTime %p => %p", (value, expected) => {
    const result = parseFhirDateTime(value);
    expect(result).toMatchObject(expected);
  });

  it("duration", () => {
    const result = duration.hours(3);
    expect(result).toMatchObject({
      value: 3,
      unit: "h",
      system: "http://unitsofmeasure.org",
      code: "h",
    });
  });

  it.each([
    [duration.years(1), duration.years(2), duration.years(3)],
    [duration.hours(1), duration.hours(6), duration.hours(7)],
    [duration.hours(1), duration.minutes(30), duration.minutes(90)],
    [duration.days(1), duration.minutes(30), duration.minutes(1470)],
    ["2023", duration.years(2), "2025"],
    ["2021-03", duration.years(2), "2023-03"],
    ["2021-11", duration.months(3), "2022-02"],
    ["2021-11-01", duration.months(3), "2022-02-01"],
    ["2021-12-30", duration.days(30), "2022-01-29"],
    ["2023-07-05T18:42:33.640Z", duration.days(1), "2023-07-06T18:42:33.640Z"],
  ])("duration.add(%p, %p) => %p", (value, durations, expected) => {
    const result = duration.add(value as string, durations);
    if (typeof expected === "string") {
      expect(result).toEqual(expected);
    } else {
      expect(result).toMatchObject(expected);
    }
  });
});
