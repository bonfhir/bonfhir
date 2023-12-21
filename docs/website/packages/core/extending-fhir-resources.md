---
sidebar_position: 5
title: Extending FHIR resources
---

bonFHIR includes built-in support for managing extensions, tags, and profiles.
You can also easily add computed values to FHIR resources to ease usage.

## Extend FHIR resources

```typescript
import { extendResource, extension, tag, Formatter } from "@bonfhir/core/r4b";

// Define a custom Patient resource
const CustomPatient = extendResource("Patient", {
  // Create a custom extension of type `code` that can be manipulated with an attribute named `birthSex`.
  birthSex: extension({
    url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
    kind: "valueCode",
  }),

  // Define a custom tag that can be manipulated with an attribute named `visiblity`
  visibility: tag({ system: "http://custom/visibility" }),

  // Define a computed value
  nameAndDob() {
    return Formatter.default.message`${["HumanName", this.name, { max: 1 }]}${[
      "date",
      this.birthDate,
      { decorator: " - born {}" },
    ]}`;
  },
});

// Use it as a constructor then
const patient = new CustomPatient({
  name: [{ given: ["John"], family: "Doe" }],
  birthDate: "1990-01-01",
});

patient.nameAndDob(); // 'John Doe - born 1/1/1990'
patient.visibility = { code: "public" };
patient.visibility; // { code: 'public', system: 'http://custom/visibility' }

patient.birthSex = "M";

// Get the FHIR Resource representation
// This is also the format used when serializing to JSON.
patient.toFhirResource();
{
  resourceType: 'Patient',
  name: [ { given: [ 'John' ], family: 'Doe' } ],
  birthDate: '1990-01-01',
  meta: { tag: [ { code: 'public', system: 'http://custom/visibility' } ] },
  extension: [
    {
      url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
      valueCode: 'M'
    }
  ],
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><ul><li><span>Birth Date: </span>1/1/1990</li><li><span>Name: </span><ul><li>John Doe</li></ul></li></ul></div>'
  }
}
```

## Usage with client

Custom resources created with `extendResource` can be used in the [client](/packages/core/fhir-client) anywhere there is a `ResourceType`
(e.g. "Patient", "Organization"...)

```typescript
const patient = await client.read(
  CustomPatient,
  "82f1033e-22a8-4026-83ab-479e7589ca88",
);

patient.nameAndDob(); // 'Abby752 Kuvalis369 - born 10/24/2002'

patient.visibility = { code: "public" };
const savedPatient = await client.save(patient);
savedPatient.toFhirResource();
{
  resourceType: 'Patient',
  ...
  meta: {
    tag: [ { code: 'public', system: 'http://custom/visibility' } ]
  },
}
```

## Complex extensions

Extensions can also be arrays by using the `allowMultiple` attribute on the `extension` method.  
More complex extensions can also be created. Have a look at the `@bonfhir/us-core` package to understand how to create
them - more specifically the
[us-core-ethnicity](https://github.com/bonfhir/bonfhir/blob/main/packages/us-core/src/r4b/patient/ethnicity.ts)
is a good example.
