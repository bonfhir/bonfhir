import { codeableConcept, extendResource } from "@bonfhir/core/r5";
import { usCorePatient } from "./patient";

describe("patient", () => {
  const USCorePatient = extendResource("Patient", {
    ...usCorePatient(),
  });

  it("should work", () => {
    const patient = new USCorePatient();
    patient.race = {
      ombCategory: [
        {
          system: "urn:oid:2.16.840.1.113883.6.238",
          code: "2106-3",
          display: "White",
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
      text: "Mixed",
    };

    expect(patient.race).toMatchObject({
      ombCategory: [
        {
          system: "urn:oid:2.16.840.1.113883.6.238",
          code: "2106-3",
          display: "White",
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
      text: "Mixed",
    });

    patient.ethnicity = {
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
      text: "Hispanic or Latino",
    };

    expect(patient.ethnicity).toMatchObject({
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
      text: "Hispanic or Latino",
    });

    patient.tribalAffiliation = {
      tribalAffiliation: codeableConcept({
        system: "http://terminology.hl7.org/CodeSystem/v3-TribalEntityUS",
        code: "187",
        display:
          "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada",
      }),
      isEnrolled: false,
    };

    expect(patient.tribalAffiliation).toMatchObject({
      tribalAffiliation: codeableConcept({
        system: "http://terminology.hl7.org/CodeSystem/v3-TribalEntityUS",
        code: "187",
        display:
          "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada",
      }),
      isEnrolled: false,
    });

    patient.birthsex = "F";
    patient.sex = "184115007";

    patient.genderIdentity = codeableConcept({
      system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
      code: "UNK",
      display: "Unknown",
    });

    expect(patient.genderIdentity).toMatchObject(
      codeableConcept({
        system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
        code: "UNK",
        display: "Unknown",
      }),
    );

    expect(patient).toMatchObject({
      extension: [
        {
          extension: [
            {
              url: "ombCategory",
              valueCoding: {
                code: "2106-3",
                display: "White",
                system: "urn:oid:2.16.840.1.113883.6.238",
              },
            },
            {
              url: "ombCategory",
              valueCoding: {
                code: "2028-9",
                display: "Asian",
                system: "urn:oid:2.16.840.1.113883.6.238",
              },
            },
            {
              url: "detailed",
              valueCoding: {
                code: "1586-7",
                display: "Shoshone",
                system: "urn:oid:2.16.840.1.113883.6.238",
              },
            },
            {
              url: "detailed",
              valueCoding: {
                code: "2036-2",
                display: "Filipino",
                system: "urn:oid:2.16.840.1.113883.6.238",
              },
            },
            {
              url: "text",
              valueString: "Mixed",
            },
          ],
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
        },
        {
          extension: [
            {
              url: "ombCategory",
              valueCoding: {
                code: "2135-2",
                display: "Hispanic or Latino",
                system: "urn:oid:2.16.840.1.113883.6.238",
              },
            },
            {
              url: "detailed",
              valueCoding: {
                code: "2184-0",
                display: "Dominican",
                system: "urn:oid:2.16.840.1.113883.6.238",
              },
            },
            {
              url: "detailed",
              valueCoding: {
                code: "2148-5",
                display: "Mexican",
                system: "urn:oid:2.16.840.1.113883.6.238",
              },
            },
            {
              url: "text",
              valueString: "Hispanic or Latino",
            },
          ],
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
        },
        {
          extension: [
            {
              url: "tribalAffiliation",
              valueCodeableConcept: {
                coding: [
                  {
                    code: "187",
                    display:
                      "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada",
                    system:
                      "http://terminology.hl7.org/CodeSystem/v3-TribalEntityUS",
                  },
                ],
                text: "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada",
              },
            },
            {
              url: "isEnrolled",
              valueBoolean: false,
            },
          ],
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation",
        },
        {
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
          valueCode: "F",
        },
        {
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-sex",
          valueCode: "184115007",
        },
        {
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-genderIdentity",
          valueCodeableConcept: {
            coding: [
              {
                code: "UNK",
                display: "Unknown",
                system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              },
            ],
            text: "Unknown",
          },
        },
      ],
      resourceType: "Patient",
    });
  });
});
