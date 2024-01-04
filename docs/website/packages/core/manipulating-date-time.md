---
sidebar_position: 4
title: Manipulating date and time
description: FHIR Native date/time/duration handling
---

bonFHIR comes built-in with a date/time subframework that can be used to manipulate date, time and duration notions
directly using the FHIR data types, without resorting to a third-party app and converting back and forth.

## Now and then

```typescript
import { duration, now, today } from "@bonfhir/core/r4b";

// now() and today() respectively represents the current dateTime and date
// with Timezone support
now(); // '2023-12-20T15:58:14.078Z'
now("America/New_York"); // '2023-12-20T11:18:51.874-05:00'
today(); // '2023-12-20'
today("Asia/Tokyo"); // '2023-12-21'

// Easily create Duration data types
duration.hours(4);
{
  "value": 4,
  "unit": "h",
  "system": "http://unitsofmeasure.org",
  "code": "h"
}

duration.minutes(15);
{
  "value": 15,
  "unit": "min",
  "system": "http://unitsofmeasure.org",
  "code": "min"
}

// Create duration from existing date / dateTime objects
// The unit selected is the highest that can represent the granularity correctly
const date = "1973-04-06";
const dateTime = "1973-04-06T16:00:00Z";

duration.from(today(), date);
{
  "value": 18520,
  "unit": "d",
  "system": "http://unitsofmeasure.org",
  "code": "d"
}

duration.from(now(), dateTime);
{
  "value": 1600129222688,
  "unit": "ms",
  "system": "http://unitsofmeasure.org",
  "code": "ms"
}

// But you can convert to the most appropriate unit for your use case
duration.convert(duration.from(now(), dateTime), "a");
{
  "value": 50.739769969843984,
  "unit": "yr",
  "system": "http://unitsofmeasure.org",
  "code": "a"
}

// You can add or substract date, dateTime and durations
duration.add(date, duration.days(3)); // '1973-04-09'
duration.subtract(date, duration.days(7)); // '1973-03-30'
duration.add(dateTime, duration.hours(12)); // '1973-04-07T04:00:00.000Z'
duration.subtract(date, duration.hours(1)); // Error! Unable to add -1 hour(s) to 1973-04-06

// Partial dates are also supported
duration.add("1980-02", duration.months(3)); // 1980-05

// Comparison between date and dateTime is easy as the FHIR format follows natural lexicographic order
// However, you can compare duration easily, with built-in units conversion
duration.compare(duration.hours(3), duration.days(1)); // -1
duration.compare(duration.hours(24), duration.days(1)); // 0

// Finally there is built-in age calculation
duration.age("1963-07-04");
{
  "value": 60,
  "unit": "yr",
  "system": "http://unitsofmeasure.org",
  "code": "a"
}
```

## Conversion / parsing of `Date` in FHIR

There are some utilities to help with converting and parsing FHIR date and time formats.

```typescript
import { fhirDate, fhirDateTime, fhirInstant, fhirTime, parseFhirDateTime } from "@bonfhir/core/r4b";

// Format a Date object to FHIR date, dateTime, instant and time formats

fhirDate(new Date("2021-03-27T10:00:00.000-04:00"); // '2021-03-27'
fhirDateTime(new Date("2021-03-27T10:00:00.000-04:00"); // '2021-03-27T14:00:00.000Z'
fhirInstant(new Date("2021-03-27T10:00:00.000-04:00"); // '2021-03-27T14:00:00.000Z'
fhirTime(new Date("2021-03-27T10:00:00.000-04:00"); // '14:00:00'

// Parse any FHIR date, dateTime, instant or time string

parseFhirDateTime("1976");
{ flavour: 'year', year: 1976, date: 1976-01-01T00:00:00.000Z }

parseFhirDateTime("1976-01");
{
  flavour: 'year-month',
  year: 1976,
  month: 1,
  date: 1976-01-01T00:00:00.000Z
}

parseFhirDateTime("1976-01-03");
{
  flavour: 'date',
  year: 1976,
  month: 1,
  day: 3,
  date: 1976-01-03T00:00:00.000Z
}

parseFhirDateTime("1976-01-03T34");
{ flavour: 'NA' }

parseFhirDateTime("1976-01-03T10:11:12Z");
{
  flavour: 'dateTime',
  year: 1976,
  month: 1,
  day: 3,
  hours: 10,
  minutes: 11,
  seconds: 12,
  milliseconds: undefined,
  timeZone: 'Z',
  date: 1976-01-03T10:11:12.000Z
}

parseFhirDateTime("1976-01-03T10:11:12-05:00");
{
  flavour: 'dateTime',
  year: 1976,
  month: 1,
  day: 3,
  hours: 10,
  minutes: 11,
  seconds: 12,
  milliseconds: undefined,
  timeZone: '-05:00',
  date: 1976-01-03T15:11:12.000Z
}

parseFhirDateTime("10:11:12");
{
  flavour: 'time',
  hours: 10,
  minutes: 11,
  seconds: 12,
  date: 1899-12-31T15:11:12.000Z
}

```
