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

    expect(JSON.stringify(patient)).toMatchSnapshot();
  });
});
