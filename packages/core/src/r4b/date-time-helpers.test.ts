import {
  DurationUnit,
  duration,
  fhirDate,
  fhirDateTime,
  fhirInstant,
  fhirTime,
  now,
  parseFhirDateTime,
  today,
} from "./date-time-helpers";
import { Duration } from "./fhir-types.codegen";

describe("date-time-helpers", () => {
  it("fhirDate", () => {
    const result = fhirDate(new Date("2021-01-01T00:00:00.000Z"));
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(parseFhirDateTime(result)).toMatchObject({
      flavour: "date",
    });
  });

  it("fhirDateTime", () => {
    const result = fhirDateTime(new Date("2021-01-01T00:00:00.000Z"));
    expect(result).toMatch(
      /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([\sT]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([,.]\d+(?!:))?)?(\17[0-5]\d([,.]\d+)?)?([Zz]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
    );
    expect(parseFhirDateTime(result)).toMatchObject({
      flavour: "dateTime",
    });
  });

  it("fhirInstant", () => {
    const result = fhirInstant(new Date("2021-01-01T00:00:00.000Z"));
    expect(result).toMatch(
      /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([\sT]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([,.]\d+(?!:))?)?(\17[0-5]\d([,.]\d+)?)?([Zz]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
    );
    expect(parseFhirDateTime(result)).toMatchObject({
      flavour: "dateTime",
    });
  });

  it("fhirTime", () => {
    const result = fhirTime(new Date("2021-01-01T10:11:12.123Z"));
    expect(result).toMatch(
      /^([01]\d|2[0-3]):[0-5]\d:([0-5]\d|60)(\.\d{1,9})?$/,
    );
  });

  it.each([undefined, "America/New_York", "Australia/Queensland"])(
    "today %p",
    (timeZone) => {
      const result = today(timeZone);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(parseFhirDateTime(result)).toMatchObject({
        flavour: "date",
      });
    },
  );

  it.each([undefined, "America/New_York", "Australia/Queensland"])(
    "now %p",
    (timeZone) => {
      const result = now(timeZone);
      expect(result).toMatch(
        /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([\sT]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([,.]\d+(?!:))?)?(\17[0-5]\d([,.]\d+)?)?([Zz]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
      );
      expect(parseFhirDateTime(result)).toMatchObject({
        flavour: "dateTime",
      });
    },
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
    [
      "22:25:06",
      {
        flavour: "time",
        hours: 22,
        minutes: 25,
        seconds: 6,
        date: expect.any(Date),
      },
    ],
    [
      "22:25:06.123",
      {
        flavour: "time",
        hours: 22,
        minutes: 25,
        seconds: 6,
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
    ["10:00:00", duration.hours(1), "11:00:00"],
    ["08:58:00", duration.minutes(3), "09:01:00"],
  ])("duration.add(%p, %p) => %p", (value, durations, expected) => {
    const result = duration.add(value as string, durations);
    if (typeof expected === "string") {
      expect(result).toEqual(expected);
    } else {
      expect(result).toMatchObject(expected);
    }
  });

  it.each([
    [duration.years(1), duration.years(2), duration.years(-1)],
    [duration.hours(6), duration.hours(1), duration.hours(5)],
    [duration.hours(1), duration.minutes(30), duration.minutes(30)],
    [duration.days(1), duration.minutes(30), duration.minutes(1410)],
    ["2023", duration.years(2), "2021"],
    ["2021-03", duration.years(2), "2019-03"],
    ["2021-11", duration.months(3), "2021-08"],
    ["2021-11-01", duration.months(3), "2021-08-01"],
    ["2021-12-30", duration.days(30), "2021-11-30"],
    ["2023-07-05T18:42:33.640Z", duration.days(1), "2023-07-04T18:42:33.640Z"],
    ["10:00:00", duration.hours(1), "09:00:00"],
    ["08:58:00", duration.minutes(3), "08:55:00"],
  ])("duration.subtract(%p, %p) => %p", (value, durations, expected) => {
    const result = duration.subtract(value as string, durations);
    if (typeof expected === "string") {
      expect(result).toEqual(expected);
    } else {
      expect(result).toMatchObject(expected);
    }
  });

  it.each([
    [duration.days(1), duration.days(1), 0],
    [duration.days(30), duration.days(1), 1],
    [duration.days(60), duration.months(1), 1],
    [duration.days(60), duration.years(1), -1],
  ])("compare %p %p ? %p", (a, b, expected) => {
    expect(duration.compare(a, b)).toEqual(expected);
  });

  it.each([
    ["2022", "2021", duration.years(1)],
    ["2022-01-01", "2021-01-01", duration.years(1)],
    ["2022-01-01", "2022-02-01", duration.days(-31)],
    ["2022-01-01T10:00:00", "2022-01-01T09:00:00", duration.hours(1)],
    ["10:00:00", "11:00:00", duration.hours(-1)],
    ["10:00:00", undefined, duration.hours(10)],
    ["05:30:00", undefined, duration.minutes(330)],
    ["01:30:25", undefined, duration.seconds(3600 + 1800 + 25)],
  ])("from %p to %p => %p", (a, b, expected) => {
    expect(duration.from(a, b as string)).toMatchObject(expected);
  });

  it.each([
    [duration.years(1), "a", undefined, undefined, duration.years(1)],
    [duration.years(1), "d", undefined, undefined, duration.days(365)],
    [
      duration.days(15_300),
      "a",
      undefined,
      undefined,
      duration.years(41.917_808_219_178_085),
    ],
    [duration.days(15_300), "a", "round", undefined, duration.years(42)],
    [duration.days(15_300), "a", "round", 2, duration.years(41.92)],
    [duration.days(15_301), "a", "ceil", 2, duration.years(41.93)],
    [duration.days(15_300), "a", "floor", 2, duration.years(41.91)],
  ] satisfies Array<
    [
      Duration,
      DurationUnit,
      "ceil" | "floor" | "round" | undefined,
      number | undefined,
      Duration,
    ]
  >)("convert(%p, %p, %p, %p) => %p", (a, b, round, digits, expected) => {
    expect(duration.convert(a, b, round, digits)).toMatchObject(expected);
  });

  it.each([
    ["1980-01-01", "2023-09-06", undefined, duration.years(43)],
    ["1980-01-01", "2023-09-07", 1, duration.years(43.7)],
    ["2023-09-07", "1980-01-01", 1, duration.years(-43.7)],
  ] satisfies Array<
    [string, string | undefined, number | undefined, Duration]
  >)("age(%p, %p, %p) => %p", (a, b, digits, expected) => {
    expect(duration.age(a, b, digits)).toMatchObject(expected);
  });
});
