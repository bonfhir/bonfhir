---
sidebar_position: 6
title: Misc helpers
description: Little things to help with development
---

bonFHIR ships with a lot of helpers function to help you manage and handle FHIR data.  
They are listed here in no particular order:

```typescript
// Check whether a reference is a reference to a specific resource type, and assert the type
const ref: Reference = { reference: "Organization/123" };
if (isReferenceOf(ref, "Organization")) {
  //ref is typed as a Reference<Organization> from now on.
}

// Some utility types
asArray("foo"); // ["foo"]
asArray(["foo"]); // ["foo"]

asError("bar"); // Error: bar
asError(new Error("bar")); // Error: bar

uniqBy([{ name: "A" }, { name: "A" }, { name: "B" }], (x) => x.name); // [({ name: "A" }, { name: "B" })]

declare const listOfPatients: Patient[];
const patientsSortedByDateOfBirthOldestFirst = listOfPatients.sort(
  compareBy("birthDate"),
);
const patientsSortedByDateOfBirthYoungestFirst = listOfPatients.sort(
  compareBy("-birthDate"),
);

urlSafeConcat("http://example.com/", "/Patient"); // 'http://example.com/Patient'
urlSafeConcat("http://example.com", "/Patient"); // 'http://example.com/Patient'
urlSafeConcat("http://example.com/", "Patient"); // 'http://example.com/Patient'
urlSafeConcat("http://example.com", "Patient"); // 'http://example.com/Patient'

// Recursively remove empty strings, null values in arrays, undefined, etc.
// Useful to convert a JS object to a valid FHIR type.
cleanFhirValues({ resourceType: "Patient", birthDate: "", name: [] }); // { resourceType: 'Patient' }

// Semantically compare 2 resources, ignoring the id, meta and text fields.
resourcesAreEqual(
  {
    resourceType: "Patient",
    id: "123",
    name: [{ family: "Doe" }],
    birthDate: "2020-01-01",
  },
  {
    resourceType: "Patient",
    id: "456",
    name: [{ family: "Doe" }],
    birthDate: "2020-01-01",
  },
); // true

resourcesAreEqual(
  {
    resourceType: "Patient",
    id: "123",
    name: [{ family: "Doe" }],
    birthDate: "2020-01-01",
  },
  {
    resourceType: "Patient",
    id: "456",
    name: [{ family: "Doe", given: ["John"] }],
    birthDate: "2020-01-01",
  },
); // false

// Check and return a strongly type resource
const result = asResource("Patient", { resourceType: "Patient" }); // result is typed as a Patient | undefined;
const result = asResource("Patient", { resourceType: "Practitioner" }); // undefined

// Find the references of a specific type
declare const patient: Patient;
const practitioner = findReference(patient.generalPractitioner, "Practitioner");
const practitioners = findReferences(
  patient.generalPractitioner,
  "Practitioner",
);

// Run the proper evaluation based on the correct Choice of Data type pattern
// See https://hl7.org/fhir/formats.html#choice
const condition = build("Condition", {
  subject: { reference: "Patient/123" },
  onsetDateTime: "2020-01-01",
});
const result = choiceOfDataTypes(condition, "onset", {
  dateTime: (value: string) => value + " as dateTime",
  string: (value: string) => value + " as string",
  period: (value: Period) => value + " as Period",
}); // '2020-01-01 as dateTime'
```
