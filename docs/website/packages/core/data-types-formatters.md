---
sidebar_position: 3
title: Data Types Formatters
---

bonFHIR comes built-in with localized, configurable formatters for all [FHIR Data Types](https://hl7.org/fhir/datatypes.html).
They can be used to present the information to users and saves a considerable amount of time when implementing FHIR solutions.

```typescript
import { build, Formatter } from "@bonfhir/core/r4b";

const patient = build("Patient", {
  active: true,
  name: [
    { given: ["John"], family: "Doe", use: "official" },
    { given: ["Johnny"], suffix: ["Jr."], use: "nickname" },
  ],
  identifier: [
    {
      type: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            code: "SS",
            display: "Social Security Number",
          },
        ],
        text: "Social Security Number",
      },
      system: "http://hl7.org/fhir/sid/us-ssn",
      value: "99983604",
    },
  ],
  birthDate: "1950-02-05",
  telecom: [
    {
      system: "email",
      use: "work",
      value: "john.doe@example.com",
    },
    {
      system: "phone",
      use: "mobile",
      value: "+1 514-514-4123",
    },
  ],
  address: [
    {
      line: ["123 Main St."],
      city: "Anytown",
      state: "NY",
      postalCode: "12345",
      country: "US",
    },
    {
      line: ["Place des Arts"],
      city: "Montréal",
      state: "QC",
      postalCode: "H2X 1Y9",
      country: "CA",
    },
  ],
});

// Using the default formatter - this is localized using ambient settings
// This example assumes a en-US localization
const formatter = Formatter.default;

formatter.format("HumanName", patient.name); // 'John Doe and Johnny'
formatter.format("HumanName", patient.name, { max: 1 }); // 'John Doe'
formatter.format("HumanName", patient.name, {
  max: 1,
  useFilterOrder: ["nickname", "official"],
  style: "full",
}); // 'Johnny Jr.'

formatter.format("date", patient.birthDate); // '2/5/1950'
formatter.format("date", patient.birthDate, { dateStyle: "full" }); // 'Sunday, February 5, 1950'
formatter.format("date", patient.birthDate, { dateStyle: "relative" }); // '74 years ago'

formatter.format("ContactPoint", patient.telecom); // 'john.doe@example.com and +1 514-514-4123'
formatter.format("ContactPoint", patient.telecom, { useFilterOrder: ["work"] }); // 'john.doe@example.com'

// Address formatting is localized by country
formatter.format("Address", patient.address); // '123 Main St., Anytown, NY 12345 and Place des Arts, Montréal QC H2X 1Y9'
formatter.format("Address", patient.address, { max: 1, lineSeparator: "\n" }); // '123 Main St.\nAnytown, NY 12345'

// Notice how it recognizes the system as being an SSN and format the value accordingly
formatter.format("Identifier", patient.identifier); // 'SSN: 999-83-604'

formatter.format("boolean", patient.active); // 'yes'

// The decorator is available on all formatter types. It only applies when there is a value to format.
formatter.format("boolean", patient.active, { decorator: "Is active? {}" }); // Is active? yes

// And many, many more options....
```

The `Formatter` instance can be customized for your own specific needs:

```typescript
const formatter = Formatter.build({
  locale: "fr-ca",
  systemsLabels: {
    "http://hl7.org/fhir/sid/us-ssn": "Numéro de sécurité sociale",
  },
});

formatter.format("Identifier", patient.identifier, { pattern: "###/##/###" }); // 'Numéro de sécurité sociale: 999/83/604'

formatter.format("date", patient.birthDate, { dateStyle: "full" }); // 'dimanche 5 février 1950'
```
