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
