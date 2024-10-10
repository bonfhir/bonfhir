/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Duration } from "@bonfhir/fhirtypes/r5";
import { Formatter } from "./formatters";

/**
 * Format a Date object as a FHIR date.
 */
export function fhirDate(date: Date): string;
export function fhirDate(date: null | undefined): undefined;
export function fhirDate(date: Date | null | undefined): string | undefined;
export function fhirDate(date: Date | null | undefined): string | undefined {
  if (!date) {
    return undefined;
  }
  return date.toISOString().slice(0, 10);
}

/**
 * Format a Date object as a FHIR dateTime.
 */
export function fhirDateTime(date: Date): string;
export function fhirDateTime(date: null | undefined): undefined;
export function fhirDateTime(date: Date | null | undefined): string | undefined;
export function fhirDateTime(
  date: Date | null | undefined,
): string | undefined {
  if (!date) {
    return undefined;
  }
  return date.toISOString();
}

/**
 * Format a Date object as a FHIR instant.
 */
export function fhirInstant(date: Date): string;
export function fhirInstant(date: null | undefined): undefined;
export function fhirInstant(date: Date | null | undefined): string | undefined;
export function fhirInstant(date: Date | null | undefined): string | undefined {
  if (!date) {
    return undefined;
  }
  return date.toISOString();
}

/**
 * Format the time portion of a Date object as a FHIR time.
 */
export function fhirTime(date: Date): string;
export function fhirTime(date: null | undefined): undefined;
export function fhirTime(date: Date | null | undefined): string | undefined;
export function fhirTime(date: Date | null | undefined): string | undefined {
  if (!date) {
    return undefined;
  }
  return date.toISOString().slice(11, 19);
}

/**
 * Return a FHIR date that expresses today's date.
 * Optionally, you can add the timezone to the function call.
 *
 * @fhirType date
 */
export function today(timeZone?: string | null | undefined): string {
  if (!timeZone) {
    return fhirDate(new Date());
  }
  // Using Sweden locale is a good approximation of ISO format
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    dateStyle: "short",
    timeStyle: undefined,
  });
  return formatter.format(new Date());
}

/**
 * Return a FHIR dateTime that expresses the current date and time.
 * Default to UTC, but passing a timezone will compute the offset properly.
 *
 * @fhirType dateTime
 */
export function now(timeZone?: string | null | undefined): string {
  if (
    !timeZone ||
    timeZone.toLowerCase() === "utc" ||
    timeZone.toLowerCase() === "z"
  ) {
    return fhirDateTime(new Date());
  }

  // Using Sweden locale is a good approximation of ISO format
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
    timeZoneName: "longOffset",
  });
  const splitted = formatter.format(new Date()).split(" ");
  return `${splitted[0]}T${splitted[1]?.replace(",", ".")}${splitted[2]
    ?.replace("GMT", "")
    .replace("−", "-")}`;
}

export type FhirDateTime =
  | FhirDateTimeNA
  | FhirDateTimeYear
  | FhirDateTimeYearMonth
  | FhirDateTimeDate
  | FhirDateTimeDateTime
  | FhirDateTimeTime;

export type FhirDateTimeFlavour = FhirDateTime["flavour"];

export interface FhirDateTimeNA {
  flavour: "NA";
}

export interface FhirDateTimeYear {
  flavour: "year";
  year: number;
  date: Date;
}

export interface FhirDateTimeYearMonth {
  flavour: "year-month";
  year: number;
  month: number;
  date: Date;
}

export interface FhirDateTimeDate {
  flavour: "date";
  year: number;
  month: number;
  day: number;
  date: Date;
}

export interface FhirDateTimeDateTime {
  flavour: "dateTime";
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number | undefined;
  timeZone: string | undefined;
  date: Date;
}

export interface FhirDateTimeTime {
  flavour: "time";
  hours: number;
  minutes: number;
  seconds: number;
  date: Date;
}

/**
 * Parse any FHIR date/dateTime/instant/time string and return a FhirDateTime object.
 */
export function parseFhirDateTime(
  value: string | null | undefined,
): FhirDateTime {
  if (!value?.trim()) {
    return { flavour: "NA" };
  }

  const matchingDateTime = value
    .trim()
    .match(
      /^(?<year>\d(\d(\d[1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(?<month>0[1-9]|1[0-2])(-(?<day>0[1-9]|[12]\d|3[01]))?)?([\sT](?<timeWithTimezone>(?<hours>[01]\d|2[0-3]):(?<minutes>[0-5]\d):(?<seconds>[0-5]\d|60)(?<milliseconds>\.\d{1,9})?(?<timeZone>Z|(\+|-)((0\d|1[0-3]):[0-5]\d|14:00))?))?$/,
    )?.groups as {
    year?: string;
    month?: string;
    day?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
    milliseconds?: string;
    timeZone?: string;
    timeWithTimezone?: string;
  };

  if (!matchingDateTime?.year) {
    const matchingTime = value
      .trim()
      .match(
        /^(?<hours>[01]\d|2[0-3]):(?<minutes>[0-5]\d):(?<seconds>[0-5]\d|60)(?<milliseconds>\.\d{1,9})?$/,
      )?.groups as {
      hours?: string;
      minutes?: string;
      seconds?: string;
    };
    if (matchingTime?.hours && matchingTime?.minutes && matchingTime?.seconds) {
      const hours = Number.parseInt(matchingTime.hours, 10);
      const minutes = Number.parseInt(matchingTime.minutes, 10);
      const seconds = Number.parseInt(matchingTime.seconds, 10);
      return {
        flavour: "time",
        hours,
        minutes,
        seconds,
        date: new Date(0, 0, 0, hours, minutes, seconds),
      };
    }
    return { flavour: "NA" };
  }

  const year = Number.parseInt(matchingDateTime.year, 10);

  if (!matchingDateTime.month) {
    return {
      flavour: "year",
      year,
      date: new Date(year, 0, 1),
    };
  }

  const month = Number.parseInt(matchingDateTime.month, 10);

  if (!matchingDateTime.day) {
    return {
      flavour: "year-month",
      year,
      month,
      date: new Date(year, month - 1, 1),
    };
  }

  const day = Number.parseInt(matchingDateTime.day, 10);

  if (!matchingDateTime.timeWithTimezone) {
    return {
      flavour: "date",
      year,
      month,
      day,
      date: new Date(year, month - 1, day),
    };
  }

  const hours = Number.parseInt(matchingDateTime.hours!, 10);
  const minutes = Number.parseInt(matchingDateTime.minutes!, 10);
  const seconds = Number.parseInt(matchingDateTime.seconds!, 10);
  const milliseconds = Number.parseInt(
    matchingDateTime.milliseconds?.slice(1) || "",
    10,
  );

  return {
    flavour: "dateTime",
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    milliseconds: Number.isNaN(milliseconds) ? undefined : milliseconds,
    timeZone: matchingDateTime.timeZone,
    date: new Date(value.trim()),
  };
}

/**
 * Add durations to a FHIR dateTime/instant/time.
 */
function add(value: string, ...durations: Duration[]): string;
/**
 * Add durations to a FHIR dateTime/instant/time.
 */
function add(value: null | undefined, ...durations: Duration[]): undefined;
/**
 * Add durations to a FHIR dateTime/instant/time.
 */
function add(
  value: string | null | undefined,
  ...durations: Duration[]
): string | undefined;
/**
 * Add durations together.
 */
function add(value: Duration, ...durations: Duration[]): Duration;
function add(
  value: Duration | string | null | undefined,
  ...durations: Duration[]
): Duration | string | undefined {
  if (!value) {
    return undefined;
  }
  if (typeof value === "string") {
    if (durations.length === 0) {
      return value;
    }
    validate(...durations);
    const finalDuration =
      durations.length === 1
        ? durations[0]!
        : add(durations[0]!, ...durations.slice(1));

    if (!finalDuration.value || finalDuration.value === 0) {
      return value;
    }

    const parsed = parseFhirDateTime(value);
    switch (parsed.flavour) {
      case "NA": {
        throw new Error(`Invalid FHIR date time: ${value}`);
      }
      case "year": {
        if (finalDuration.code === "a") {
          return `${parsed.year + finalDuration.value}`;
        }
        throw new Error(
          `Unable to add ${Formatter.default.format(
            "Duration",
            finalDuration,
          )} to ${value}`,
        );
      }
      case "year-month": {
        if (finalDuration.code === "a") {
          return `${parsed.year + finalDuration.value}-${parsed.month
            .toString()
            .padStart(2, "0")}`;
        }
        if (finalDuration.code === "mo") {
          let finalMonth = parsed.month + finalDuration.value;
          const finalYear = parsed.year + Math.floor(finalMonth / 12);
          finalMonth = finalMonth % 12;
          return `${finalYear}-${finalMonth.toString().padStart(2, "0")}`;
        }
        throw new Error(
          `Unable to add ${JSON.stringify(finalDuration)} to ${value}`,
        );
      }
      case "date": {
        const copiedDate = new Date(parsed.date.getTime());
        switch (finalDuration.code) {
          case "a": {
            copiedDate.setFullYear(
              copiedDate.getFullYear() + finalDuration.value,
            );
            break;
          }
          case "mo": {
            copiedDate.setMonth(copiedDate.getMonth() + finalDuration.value);
            break;
          }
          case "d": {
            copiedDate.setDate(copiedDate.getDate() + finalDuration.value);
            break;
          }
          default: {
            throw new Error(
              `Unable to add ${Formatter.default.format(
                "Duration",
                finalDuration,
              )} to ${value}`,
            );
          }
        }
        return fhirDate(copiedDate);
      }
      case "dateTime": {
        const copiedDate = new Date(parsed.date.getTime());
        switch (finalDuration.code) {
          case "a": {
            copiedDate.setFullYear(
              copiedDate.getFullYear() + finalDuration.value,
            );
            break;
          }
          case "mo": {
            copiedDate.setMonth(copiedDate.getMonth() + finalDuration.value);
            break;
          }
          case "d": {
            copiedDate.setDate(copiedDate.getDate() + finalDuration.value);
            break;
          }
          case "h": {
            copiedDate.setHours(copiedDate.getHours() + finalDuration.value);
            break;
          }
          case "min": {
            copiedDate.setMinutes(
              copiedDate.getMinutes() + finalDuration.value,
            );
            break;
          }
          case "s": {
            copiedDate.setSeconds(
              copiedDate.getSeconds() + finalDuration.value,
            );
            break;
          }
          case "ms": {
            copiedDate.setMilliseconds(
              copiedDate.getMilliseconds() + finalDuration.value,
            );
            break;
          }
          default: {
            throw new Error(
              `Unable to add ${Formatter.default.format(
                "Duration",
                finalDuration,
              )} to ${value}`,
            );
          }
        }
        return fhirDateTime(copiedDate);
      }
      case "time": {
        const copiedDate = new Date(parsed.date.getTime());
        switch (finalDuration.code) {
          case "h": {
            copiedDate.setHours(copiedDate.getHours() + finalDuration.value);
            break;
          }
          case "min": {
            copiedDate.setMinutes(
              copiedDate.getMinutes() + finalDuration.value,
            );
            break;
          }
          case "s": {
            copiedDate.setSeconds(
              copiedDate.getSeconds() + finalDuration.value,
            );
            break;
          }
          case "ms": {
            copiedDate.setMilliseconds(
              copiedDate.getMilliseconds() + finalDuration.value,
            );
            break;
          }
          default: {
            throw new Error(
              `Unable to add ${Formatter.default.format(
                "Duration",
                finalDuration,
              )} to ${value}`,
            );
          }
        }
        if (copiedDate.getDate() !== parsed.date.getDate()) {
          throw new Error(
            `Unable to add duration ${Formatter.default.format(
              "Duration",
              finalDuration,
            )} to ${value} as it would change the date.`,
          );
        }
        return fhirTime(copiedDate);
      }
      default: {
        throw new Error(
          `Unable to add ${Formatter.default.format(
            "Duration",
            finalDuration,
          )} to ${value}`,
        );
      }
    }
  }

  if (durations.length === 0) {
    return value;
  }

  validate(...durations);
  let result = value;
  for (const duration of durations) {
    const [valueResult, valueDuration, targetDuration] =
      convertToCommonCodeResolution(result, duration);
    result = {
      value: valueResult + valueDuration,
      unit: targetDuration.unit,
      system: "http://unitsofmeasure.org",
      code: targetDuration.code,
    };
  }
  return result;
}

/**
 * Subtract durations to a FHIR dateTime/instant/time.
 */
function subtract(value: string, ...durations: Duration[]): string;
/**
 * Subtract durations to a FHIR dateTime/instant/time.
 */
function subtract(value: null | undefined, ...durations: Duration[]): undefined;
/**
 * Subtract durations to a FHIR dateTime/instant/time.
 */
function subtract(
  value: string | null | undefined,
  ...durations: Duration[]
): string | undefined;
/**
 * Subtract durations together.
 */
function subtract(value: Duration, ...durations: Duration[]): Duration;
function subtract(
  value: Duration | string | null | undefined,
  ...durations: Duration[]
): Duration | string | undefined {
  return add(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value as any,
    ...durations.map((duration) => ({
      ...duration,
      value: duration.value ? -duration.value : undefined,
    })),
  );
}

/**
 * Create a Duration from a time.
 */
function from(a: string): Duration;
/**
 * Create a Duration by computing the difference between two date/dateTime/instant/time.
 */
function from(
  a: string,
  b: string,
  absolute?: boolean | null | undefined,
): Duration;
function from(
  a: string,
  b?: string | undefined,
  absolute?: boolean | null | undefined,
): Duration {
  if (b == undefined) {
    const parsedA = parseFhirDateTime(a);
    if (parsedA.flavour !== "time") {
      throw new Error(`Unable to create duration from ${a} alone.`);
    }
    if (parsedA.seconds !== 0) {
      return duration.seconds(
        parsedA.seconds + parsedA.minutes * 60 + parsedA.hours * 3600,
      );
    }
    if (parsedA.minutes !== 0) {
      return duration.minutes(parsedA.minutes + parsedA.hours * 60);
    }
    return duration.hours(parsedA.hours);
  }
  const parsedA = parseFhirDateTime(a);
  const parsedB = parseFhirDateTime(b);
  if (parsedA.flavour === "NA" || parsedB.flavour === "NA") {
    throw new Error(`Invalid FHIR date/time: ${a} or ${b}`);
  }
  let diffTime = parsedA.date.getTime() - parsedB.date.getTime();
  if (absolute) {
    diffTime = Math.abs(diffTime);
  }
  if (diffTime % 1000 !== 0) {
    return {
      value: diffTime,
      unit: "ms",
      system: "http://unitsofmeasure.org",
      code: "ms",
    };
  }
  diffTime /= 1000;
  if (diffTime % 60 !== 0) {
    return {
      value: diffTime,
      unit: "s",
      system: "http://unitsofmeasure.org",
      code: "s",
    };
  }
  diffTime /= 60;
  if (diffTime % 60 !== 0) {
    return {
      value: diffTime,
      unit: "min",
      system: "http://unitsofmeasure.org",
      code: "min",
    };
  }
  diffTime /= 60;
  if (diffTime % 24 !== 0) {
    return {
      value: diffTime,
      unit: "h",
      system: "http://unitsofmeasure.org",
      code: "h",
    };
  }
  diffTime /= 24;
  if (diffTime % 365 === 0) {
    return {
      value: diffTime / 365,
      unit: "yr",
      system: "http://unitsofmeasure.org",
      code: "a",
    };
  }
  if (diffTime % 30 !== 0) {
    return {
      value: diffTime,
      unit: "d",
      system: "http://unitsofmeasure.org",
      code: "d",
    };
  }
  diffTime /= 30;
  if (diffTime % 12 !== 0) {
    return {
      value: diffTime,
      unit: "mo",
      system: "http://unitsofmeasure.org",
      code: "mo",
    };
  }
  diffTime /= 12;
  return {
    value: diffTime,
    unit: "yr",
    system: "http://unitsofmeasure.org",
    code: "a",
  };
}

/**
 * Compare durations between each other.
 */
function compare(a: Duration, b: Duration): -1 | 0 | 1 {
  validate(a as Duration, b as Duration);
  const [valueA, valueB] = convertToCommonCodeResolution(
    a as Duration,
    b as Duration,
  );

  if (valueA < valueB) {
    return -1;
  }

  if (valueA > valueB) {
    return 1;
  }

  return 0;
}

export type DurationUnit = "a" | "mo" | "d" | "h" | "min" | "s" | "ms";

/**
 * Convert a duration to the specified duration unit.
 * May apply rounding in the process.
 */
function convert(duration: Duration, to: DurationUnit): Duration;
function convert(
  duration: Duration,
  to: DurationUnit,
  round: "ceil" | "floor" | "round",
  digits?: number | null | undefined,
): Duration;
function convert(
  duration: Duration,
  to: DurationUnit,
  round?: "ceil" | "floor" | "round" | null | undefined,
  digits?: number | null | undefined,
): Duration;
function convert(
  duration: Duration,
  to: DurationUnit,
  round?: "ceil" | "floor" | "round" | null | undefined,
  digits?: number | null | undefined,
): Duration {
  if (!duration.code) {
    throw new Error(`Missing code in duration ${JSON.stringify(duration)}`);
  }
  if (duration.code === to) {
    return duration;
  }
  const conversionFactor = CONVERSION_FACTORS[duration.code]?.[to];
  if (!conversionFactor) {
    throw new Error(
      `Unable to convert ${duration.code} to ${to} - missing conversion factor.`,
    );
  }

  return {
    value: roundTo((duration.value || 0) * conversionFactor, round, digits),
    unit: UCUM_CODE_UNIT[to] ?? to,
    system: "http://unitsofmeasure.org",
    code: to,
  };
}

function roundTo(
  value: number,
  round: "ceil" | "floor" | "round" | null | undefined,
  digits: number | null | undefined,
): number {
  if (!round) {
    return value;
  }

  digits ??= 0;

  if (digits === 0) {
    return Math[round](value);
  }

  let negative = false;
  if (value < 0) {
    negative = true;
    value = value * -1;
  }
  const multiplier = Math.pow(10, digits);
  value = Number.parseFloat((value * multiplier).toFixed(11));
  value = Number((Math[round](value) / multiplier).toFixed(digits));
  if (negative) {
    value = Number((value * -1).toFixed(digits));
  }
  return value;
}

/**
 * Return a duration in years from the value to relativeTo or `today()`,
 * which should represent an age in years relative to a date.
 *
 * This is in fact a shortcut for the following operations:
 * `duration.round(duration.from(value, relativeTo || today()), "a", "floor")`
 *
 * @example
 * const age = duration.age(patient.birthDate) // age in years from birthDate to today
 */
function age(
  value: string,
  relativeTo?: string | null | undefined,
  digits?: number | null | undefined,
): Duration;
function age(
  value: null | undefined,
  relativeTo?: string | null | undefined,
  digits?: number | null | undefined,
): undefined;
function age(
  value: string | null | undefined,
  relativeTo?: string | null | undefined,
  digits?: number | null | undefined,
): Duration | undefined;
function age(
  value: string | null | undefined,
  relativeTo?: string | null | undefined,
  digits?: number | null | undefined,
): Duration | undefined {
  if (!value) {
    return undefined;
  }

  return convert(from(relativeTo || today(), value), "a", "floor", digits);
}

export const duration = {
  zero(): Duration {
    return {
      value: 0,
      unit: "ms",
      system: "http://unitsofmeasure.org",
      code: "ms",
    };
  },
  years(value: number): Duration {
    return {
      value: value,
      unit: "yr",
      system: "http://unitsofmeasure.org",
      code: "a",
    };
  },
  months(value: number): Duration {
    return {
      value: value,
      unit: "mo",
      system: "http://unitsofmeasure.org",
      code: "mo",
    };
  },
  days(value: number): Duration {
    return {
      value: value,
      unit: "d",
      system: "http://unitsofmeasure.org",
      code: "d",
    };
  },
  hours(value: number): Duration {
    return {
      value: value,
      unit: "h",
      system: "http://unitsofmeasure.org",
      code: "h",
    };
  },
  minutes(value: number): Duration {
    return {
      value: value,
      unit: "min",
      system: "http://unitsofmeasure.org",
      code: "min",
    };
  },
  seconds(value: number): Duration {
    return {
      value: value,
      unit: "s",
      system: "http://unitsofmeasure.org",
      code: "s",
    };
  },
  milliseconds(value: number): Duration {
    return {
      value: value,
      unit: "ms",
      system: "http://unitsofmeasure.org",
      code: "ms",
    };
  },
  add,
  age,
  convert,
  subtract,
  compare,
  from,
};

const ORDERED_UCUM_CODES = ["a", "mo", "d", "h", "min", "s", "ms"];
const UCUM_CODE_UNIT: Record<string, string> = {
  a: "yr",
};
const CONVERSION_FACTORS: Record<string, Record<string, number>> = {
  a: {
    a: 1,
    mo: 12,
    d: 365,
    h: 365 * 24,
    min: 365 * 24 * 60,
    s: 365 * 24 * 60 * 60,
    ms: 365 * 24 * 60 * 60 * 1000,
  },
  mo: {
    a: 1 / 12,
    mo: 1,
    d: 30,
    h: 30 * 24,
    min: 30 * 24 * 60,
    s: 30 * 24 * 60 * 60,
    ms: 30 * 24 * 60 * 60 * 1000,
  },
  d: {
    a: 1 / 365,
    mo: 1 / 30,
    d: 1,
    h: 24,
    min: 24 * 60,
    s: 24 * 60 * 60,
    ms: 24 * 60 * 60 * 1000,
  },
  h: {
    a: 1 / (365 * 24),
    mo: 1 / (30 * 24),
    d: 1 / 24,
    h: 1,
    min: 60,
    s: 60 * 60,
    ms: 60 * 60 * 1000,
  },
  min: {
    a: 1 / (365 * 24 * 60),
    mo: 1 / (30 * 24 * 60),
    d: 1 / (24 * 60),
    h: 1 / 60,
    min: 1,
    s: 60,
    ms: 60 * 1000,
  },
  s: {
    a: 1 / (365 * 24 * 60 * 60),
    mo: 1 / (30 * 24 * 60 * 60),
    d: 1 / (24 * 60 * 60),
    h: 1 / (60 * 60),
    min: 1 / 60,
    s: 1,
    ms: 1000,
  },
  ms: {
    a: 1 / (365 * 24 * 60 * 60 * 1000),
    mo: 1 / (30 * 24 * 60 * 60 * 1000),
    d: 1 / (24 * 60 * 60 * 1000),
    h: 1 / (60 * 60 * 1000),
    min: 1 / (60 * 1000),
    s: 1 / 1000,
    ms: 1,
  },
};

function convertToCommonCodeResolution(
  result: Duration,
  duration: Duration,
): [number, number, Pick<Duration, "unit" | "code">] {
  if (result.code === duration.code) {
    return [result.value || 0, duration.value || 0, result];
  }

  const commonCode =
    ORDERED_UCUM_CODES[
      Math.max(
        ORDERED_UCUM_CODES.indexOf(result.code!),
        ORDERED_UCUM_CODES.indexOf(duration.code!),
      )
    ];
  if (!commonCode) {
    throw new Error(
      `Unable to find a common code when adding durations: ${Formatter.default.format(
        "Duration",
        result,
      )} + ${Formatter.default.format("Duration", duration)}`,
    );
  }

  let resultValue = result.value;
  if (result.code !== commonCode) {
    resultValue =
      (result.value || 0) * CONVERSION_FACTORS[result.code!]![commonCode]!;
  }
  let durationValue = duration.value;
  if (duration.code !== commonCode) {
    durationValue =
      (duration.value || 0) * CONVERSION_FACTORS[duration.code!]![commonCode]!;
  }

  return [
    resultValue || 0,
    durationValue || 0,
    { code: commonCode, unit: UCUM_CODE_UNIT[commonCode] ?? commonCode },
  ];
}

function validate(...durations: Duration[]) {
  for (const duration of durations) {
    if (duration.value == undefined) {
      throw new Error(`Missing value in duration ${JSON.stringify(duration)}`);
    }
    if (!duration.code || !ORDERED_UCUM_CODES.includes(duration.code)) {
      throw new Error(`Unknown code in duration ${JSON.stringify(duration)}`);
    }
    if (duration.system && duration.system !== "http://unitsofmeasure.org") {
      throw new Error(
        `Unsupported system in duration ${JSON.stringify(
          duration,
        )} - must be https://unitsofmeasure.org`,
      );
    }
  }
}
