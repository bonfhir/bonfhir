/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Duration } from "./fhir-types.codegen.js";

/**
 * Return a FHIR date that expresses today's date.
 * Optionally, you can add the timezone to the function call.
 *
 * @fhirType date
 */
export function today(timeZone?: string | null | undefined): string {
  if (!timeZone) {
    return new Date().toISOString().slice(0, 10);
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
    return new Date().toISOString();
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
  | FhirDateTimeDateTime;

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

export function parseFhirDateTime(
  value: string | null | undefined
): FhirDateTime {
  if (!value?.trim()) {
    return { flavour: "NA" };
  }

  const matchingData = value
    .trim()
    .match(
      /^(?<year>\d(\d(\d[1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(?<month>0[1-9]|1[0-2])(-(?<day>0[1-9]|[12]\d|3[01]))?)?([\sT](?<timeWithTimezone>(?<hours>[01]\d|2[0-3]):(?<minutes>[0-5]\d):(?<seconds>[0-5]\d|60)(?<milliseconds>\.\d{1,9})?(?<timeZone>Z|(\+|-)((0\d|1[0-3]):[0-5]\d|14:00))?))?$/
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

  if (!matchingData?.year) {
    return { flavour: "NA" };
  }

  const year = Number.parseInt(matchingData.year, 10);

  if (!matchingData.month) {
    return {
      flavour: "year",
      year,
      date: new Date(year, 0, 1),
    };
  }

  const month = Number.parseInt(matchingData.month, 10);

  if (!matchingData.day) {
    return {
      flavour: "year-month",
      year,
      month,
      date: new Date(year, month - 1, 1),
    };
  }

  const day = Number.parseInt(matchingData.day, 10);

  if (!matchingData.timeWithTimezone) {
    return {
      flavour: "date",
      year,
      month,
      day,
      date: new Date(year, month - 1, day),
    };
  }

  const hours = Number.parseInt(matchingData.hours!, 10);
  const minutes = Number.parseInt(matchingData.minutes!, 10);
  const seconds = Number.parseInt(matchingData.seconds!, 10);
  const milliseconds = Number.parseInt(
    matchingData.milliseconds?.slice(1) || "",
    10
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
    timeZone: matchingData.timeZone,
    date: new Date(value.trim()),
  };
}

function add(value: string, ...durations: Duration[]): string;
function add(value: null | undefined, ...durations: Duration[]): undefined;
function add(
  value: string | null | undefined,
  ...durations: Duration[]
): string | undefined;
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
          `Unable to add ${JSON.stringify(finalDuration)} to ${value}`
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
          `Unable to add ${JSON.stringify(finalDuration)} to ${value}`
        );
      }
      case "date": {
        const copiedDate = new Date(parsed.date.getTime());
        switch (finalDuration.code) {
          case "a": {
            copiedDate.setFullYear(
              copiedDate.getFullYear() + finalDuration.value
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
              `Unable to add ${JSON.stringify(finalDuration)} to ${value}`
            );
          }
        }
        return copiedDate.toISOString().slice(0, 10);
      }
      case "dateTime": {
        const copiedDate = new Date(parsed.date.getTime());
        switch (finalDuration.code) {
          case "a": {
            copiedDate.setFullYear(
              copiedDate.getFullYear() + finalDuration.value
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
              copiedDate.getMinutes() + finalDuration.value
            );
            break;
          }
          case "s": {
            copiedDate.setSeconds(
              copiedDate.getSeconds() + finalDuration.value
            );
            break;
          }
          case "ms": {
            copiedDate.setMilliseconds(
              copiedDate.getMilliseconds() + finalDuration.value
            );
            break;
          }
          default: {
            throw new Error(
              `Unable to add ${JSON.stringify(finalDuration)} to ${value}`
            );
          }
        }
        return copiedDate.toISOString();
      }
      default: {
        throw new Error(
          `Unable to add ${JSON.stringify(finalDuration)} to ${value}`
        );
      }
    }
  }

  if (durations.length === 0) {
    return value;
  }

  let result = value;
  for (const duration of durations) {
    const [valueResult, valueDuration, targetDuration] = convert(
      result,
      duration
    );
    result = {
      value: valueResult + valueDuration,
      unit: targetDuration.unit,
      system: "http://unitsofmeasure.org",
      code: targetDuration.code,
    };
  }
  return result;
}

export const duration = {
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
};

const ORDERED_UCUM_CODES = ["a", "mo", "d", "h", "min", "s", "ms"];
const UCUM_CODE_UNIT: Record<string, string> = {
  a: "yr",
};
const CONVERSATION_FACTORS: Record<string, Record<string, number>> = {
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

function convert(
  result: Duration,
  duration: Duration
): [number, number, Pick<Duration, "unit" | "code">] {
  if (!result.code || !duration.code) {
    throw new Error(
      `Missing code in duration ${JSON.stringify(result)} or ${JSON.stringify(
        duration
      )}`
    );
  }
  if (result.code === duration.code) {
    return [result.value || 0, duration.value || 0, result];
  }

  if (
    !ORDERED_UCUM_CODES.includes(result.code) ||
    !ORDERED_UCUM_CODES.includes(duration.code)
  ) {
    throw new Error(
      `Unknown code in duration ${JSON.stringify(result)} or ${JSON.stringify(
        duration
      )}`
    );
  }

  const commonCode =
    ORDERED_UCUM_CODES[
      Math.max(
        ORDERED_UCUM_CODES.indexOf(result.code),
        ORDERED_UCUM_CODES.indexOf(duration.code)
      )
    ];
  if (!commonCode) {
    throw new Error(
      `Unable to find a common code when adding durations: ${JSON.stringify(
        result
      )} + ${JSON.stringify(duration)}`
    );
  }

  let resultValue = result.value;
  if (result.code !== commonCode) {
    resultValue =
      (result.value || 0) * CONVERSATION_FACTORS[result.code]![commonCode]!;
  }
  let durationValue = duration.value;
  if (duration.code !== commonCode) {
    durationValue =
      (duration.value || 0) * CONVERSATION_FACTORS[duration.code]![commonCode]!;
  }

  return [
    resultValue || 0,
    durationValue || 0,
    { code: commonCode, unit: UCUM_CODE_UNIT[commonCode] ?? commonCode },
  ];
}
