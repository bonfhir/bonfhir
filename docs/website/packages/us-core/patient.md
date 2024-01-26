---
sidebar_position: 1
title: Patient
description: US Core extensions for patients
---

## Whole profile

Create a [custom FHIR resource](/packages/core/extending-fhir-resources) in accordance with the [US Core Patient Profile](https://www.hl7.org/fhir/us/core/StructureDefinition-us-core-patient.html):

```typescript
const USCorePatient = extendResource(
  "Patient",
  {
    ...usCorePatient(),
  },
  {
    profile: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient",
  },
);
```

Then use it as a normal resource:

```typescript
const patient = new USCorePatient({
  name: [{ given: ["John"], family: "Doe" }],
});

patient.race = {
  text: "mixed",
  ombCategory: [
    {
      system: "urn:oid:2.16.840.1.113883.6.238",
      code: "2106-3",
      display: "White",
    },
    {
      system: "urn:oid:2.16.840.1.113883.6.238",
      code: "1002-5",
      display: "American Indian or Alaska Native",
    },
    {
      system: "urn:oid:2.16.840.1.113883.6.238",
      code: "2028-9",
      display: "Asian",
    },
  ],
  detailed: [
    {
      system: "urn:oid:2.16.840.1.113883.6.238",
      code: "1586-7",
      display: "Shoshone",
    },
    {
      system: "urn:oid:2.16.840.1.113883.6.238",
      code: "2036-2",
      display: "Filipino",
    },
  ],
};
patient.ethnicity = {
  text: "Hispanic or Latino",
  ombCategory: {
    system: "urn:oid:2.16.840.1.113883.6.238",
    code: "2135-2",
    display: "Hispanic or Latino",
  },
  detailed: [
    {
      system: "urn:oid:2.16.840.1.113883.6.238",
      code: "2184-0",
      display: "Dominican",
    },
    {
      system: "urn:oid:2.16.840.1.113883.6.238",
      code: "2148-5",
      display: "Mexican",
    },
  ],
};
patient.tribalAffiliation = {
  tribalAffiliation: codeableConcept({
    system: "http://terminology.hl7.org/CodeSystem/v3-TribalEntityUS",
    code: "187",
    display:
      "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada",
  }),
  isEnrolled: false,
};
patient.birthsex = "F";
patient.sex = "248152002";
patient.genderIdentity = codeableConcept({
  system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
  code: "UNK",
  display: "Unknown",
});

await client.save(patient);

const retrievedPatient = await client.read(
  USCorePatient,
  "76998acb-b24e-41f2-ab65-ad22d0eb4640",
);
```

When serialized / saved:

```json
{
  "resourceType": "Patient",
  "name": [
    {
      "given": ["John"],
      "family": "Doe"
    }
  ],
  "extension": [
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
      "extension": [
        {
          "url": "ombCategory",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2106-3",
            "display": "White"
          }
        },
        {
          "url": "ombCategory",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "1002-5",
            "display": "American Indian or Alaska Native"
          }
        },
        {
          "url": "ombCategory",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2028-9",
            "display": "Asian"
          }
        },
        {
          "url": "detailed",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "1586-7",
            "display": "Shoshone"
          }
        },
        {
          "url": "detailed",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2036-2",
            "display": "Filipino"
          }
        },
        {
          "url": "text",
          "valueString": "mixed"
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
      "extension": [
        {
          "url": "ombCategory",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2135-2",
            "display": "Hispanic or Latino"
          }
        },
        {
          "url": "detailed",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2184-0",
            "display": "Dominican"
          }
        },
        {
          "url": "detailed",
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2148-5",
            "display": "Mexican"
          }
        },
        {
          "url": "text",
          "valueString": "Hispanic or Latino"
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation",
      "extension": [
        {
          "url": "tribalAffiliation",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/v3-TribalEntityUS",
                "code": "187",
                "display": "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada"
              }
            ],
            "text": "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada"
          }
        },
        {
          "url": "isEnrolled",
          "valueBoolean": false
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
      "valueCode": "F"
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-sex",
      "valueCode": "248152002"
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-genderIdentity",
      "valueCodeableConcept": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
            "code": "UNK",
            "display": "Unknown"
          }
        ],
        "text": "Unknown"
      }
    }
  ],
  "text": {
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><ul><li><span>Name: </span><ul><li>John Doe</li></ul></li></ul></div>"
  },
  "meta": {
    "profile": [
      "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"
    ]
  }
}
```

## Mix & match

You can also use individual extensions and compose it for your model:

```typescript
const CustomPatient = extendResource("Patient", {
  race: usCoreRace(),
  ethnicity: usCoreEthnicity(),

  myTag: tag({
    system: "http://example.org/fhir/tag",
  }),
});
```
