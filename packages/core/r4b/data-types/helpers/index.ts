/* Date and Time regexp fragments */

export const fhirDateRegexpFragment =
  "(?<date>" +
  "(?<year>[0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)" + // mandatory year
  "(" +
  "-(?<month>0[1-9]|1[0-2])" + // month
  "(" +
  "-(?<day>0[1-9]|[1-2][0-9]|3[0-1])" + // day
  ")?" + //optional day
  ")?" + // optional month
  ")";

export const fhirTimeRegexpFragment =
  "(?<time>" +
  "(?<hours>[01][0-9]|2[0-3]):" +
  "(?<minutes>[0-5][0-9]):" +
  "(?<seconds>[0-5][0-9]|60)" +
  "(?<milliseconds>\\.[0-9]{1,9})?" +
  ")";

export const fhirTimezoneRegexpFragment =
  "(?<timezone>Z|(\\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))";

export const fhirTimeWithZoneRegexpFragment =
  "(?<timeWithTimezone>" +
  fhirTimeRegexpFragment +
  fhirTimezoneRegexpFragment +
  ")";

export const removeDoubleSpaces = (value: string): string =>
  value.replace(/\s{2,}/g, " ").trim();
