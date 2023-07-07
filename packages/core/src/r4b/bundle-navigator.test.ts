/* eslint-disable @typescript-eslint/no-non-null-assertion */

import patientsListFixture from "../../fixtures/bundle-navigator.list-patients.test.fhir.json";
import { bundleNavigator } from "./bundle-navigator.js";
import { extendResource } from "./extensions.js";
import {
  AnyResource,
  Bundle,
  Organization,
  Patient,
  Provenance,
  Retrieved,
} from "./fhir-types.codegen.js";
import { reference } from "./references.codegen.js";

describe("BundleNavigator", () => {
  const emptyBundle: Bundle = {
    resourceType: "Bundle",
    type: "searchset",
  };

  const patientsListBundle = patientsListFixture as Bundle<Patient>;

  describe("with resources types", () => {
    describe("reference", () => {
      it("returns undefined when not found", () => {
        const navigator = bundleNavigator(emptyBundle);

        const resource = navigator.reference("unknown_reference");

        expect(resource).toBeUndefined();
      });

      it.each([undefined, undefined, ""])(
        "returns undefined when reference is",
        (value) => {
          const navigator = bundleNavigator(patientsListBundle);

          const result = navigator.reference(value);

          expect(result).toBeUndefined();
        },
      );

      it("returns resources", () => {
        const navigator = bundleNavigator(patientsListBundle);
        const matches = patientsListFixture.entry.filter(
          (x) => x.search.mode == "match",
        );
        const include = patientsListFixture.entry.find(
          (x) => x.search.mode == "include",
        );

        const search1 = navigator.reference(
          reference(matches[0]!.resource as Retrieved<Organization>),
        );
        const search2 = navigator.reference(
          reference(matches[1]!.resource as Retrieved<AnyResource>).reference,
        );
        const include1 = navigator.reference(
          reference(include!.resource as Retrieved<AnyResource>).reference,
        );

        expect(search1).toMatchObject(matches[0]!.resource);
        expect(search2).toMatchObject(matches[1]!.resource);
        expect(include1).toMatchObject(include!.resource);
      });

      it("returns from bundle references", () => {
        const navigator = bundleNavigator(patientsListBundle);

        const provenance = navigator.type("Provenance")[0];
        const patientReference = provenance?.target[0]?.reference;
        const targetPatient = navigator.reference(patientReference!);

        expect(patientReference?.length).toBeTruthy();
        expect(targetPatient).not.toBeUndefined();
      });
    });

    describe("revReference", () => {
      it("returns a revinclude reference", () => {
        const navigator = bundleNavigator(patientsListBundle);
        const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";
        const expectedProvenance = patientsListFixture.entry.find(
          (x) =>
            x.resource?.resourceType === "Provenance" &&
            (x.resource as Provenance).target[0]!.reference ===
              patientReference,
        )!.resource;

        const provenanceWithPatientTarget = navigator.revReference<Provenance>(
          (provenance) => provenance.target,
          patientReference,
        );

        expect(expectedProvenance).not.toBeUndefined();
        expect(provenanceWithPatientTarget).toMatchObject(
          expect.arrayContaining([expectedProvenance]),
        );
      });

      it("returns an empty array when not found", () => {
        const navigator = bundleNavigator(emptyBundle);
        const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";

        const provenanceWithPatientTarget = navigator.revReference<Provenance>(
          (provenance) => provenance.target,
          patientReference,
        );

        expect(provenanceWithPatientTarget.length).toBe(0);
      });

      it.each([undefined, undefined, ""])(
        "returns an empty array when reference is",
        (patientReference) => {
          const navigator = bundleNavigator(patientsListBundle);

          const result = navigator.revReference<Provenance>(
            (provenance) => provenance.target,
            patientReference,
          );

          expect(result.length).toBe(0);
        },
      );

      it("filters undefined and null values in selector", () => {
        const navigator = bundleNavigator(patientsListBundle);
        const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";
        const expectedProvenance = patientsListFixture.entry.find(
          (x) =>
            x.resource?.resourceType === "Provenance" &&
            (x.resource as Provenance).target[0]!.reference ===
              patientReference,
        )!.resource;

        const provenanceWithPatientTarget = navigator.revReference<Provenance>(
          // eslint-disable-next-line unicorn/no-null
          (provenance) => [undefined, ...(provenance.target || []), null],
          patientReference,
        );

        expect(expectedProvenance).not.toBeUndefined();
        expect(provenanceWithPatientTarget).toMatchObject(
          expect.arrayContaining([expectedProvenance]),
        );
      });
    });

    describe("firstRevReference", () => {
      it("returns a revinclude reference", () => {
        const navigator = bundleNavigator(patientsListBundle);
        const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";
        const expectedProvenance = patientsListFixture.entry.find(
          (x) =>
            x.resource?.resourceType === "Provenance" &&
            (x.resource as Provenance).target[0]!.reference ===
              patientReference,
        )!.resource;

        const provenanceWithPatientTarget = navigator.revReference<Provenance>(
          (provenance) => provenance.target,
          patientReference,
        )[0];

        expect(expectedProvenance).not.toBeUndefined();
        expect(provenanceWithPatientTarget).toMatchObject(expectedProvenance);
      });

      it("returns a undefined when not found", () => {
        const navigator = bundleNavigator(emptyBundle);
        const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";

        const provenanceWithPatientTarget = navigator.revReference<Provenance>(
          (provenance) => provenance.target,
          patientReference,
        )[0];

        expect(provenanceWithPatientTarget).toBeUndefined();
      });

      it.each([undefined, undefined, ""])(
        "returns undefined when reference is",
        (patientReference) => {
          const navigator = bundleNavigator(patientsListBundle);

          const result = navigator.revReference<Provenance>(
            (provenance) => provenance.target,
            patientReference,
          )[0];

          expect(result).toBeUndefined();
        },
      );
    });

    describe("searchMatch", () => {
      it("returns empty matches on empty bundles", () => {
        const navigator = bundleNavigator(emptyBundle);

        const matches = navigator.searchMatch();

        expect(matches.length).toBe(0);
      });

      it("returns matches", () => {
        const navigator = bundleNavigator(patientsListBundle);

        const matches = navigator.searchMatch();

        expect(matches.length).toBeGreaterThan(0);
        expect(matches).toMatchObject(
          expect.arrayContaining([
            expect.objectContaining<Patient>({
              resourceType: "Patient",
            }),
          ]),
        );
      });
    });

    describe("searchMatchOne", () => {
      it("throw on searchMatchOne on empty bundles", () => {
        const navigator = bundleNavigator(emptyBundle);
        expect(() => navigator.searchMatchOne()).toThrow();
      });

      it("returns searchMatchOne consistently", () => {
        const navigator = bundleNavigator({
          ...patientsListBundle,
          entry: [
            patientsListBundle.entry!.find(
              (x) => x.resource?.resourceType === "Patient",
            )!,
            ...(patientsListBundle.entry?.filter(
              (x) => x.resource?.resourceType !== "Patient",
            ) || []),
          ],
        });

        const firstSearchMatch = navigator.searchMatchOne();
        const firstSearchMatchSecondTime = navigator.searchMatchOne();

        expect(firstSearchMatch).toMatchObject<Patient>({
          resourceType: "Patient",
        });
        expect(firstSearchMatchSecondTime).toMatchObject<Patient>({
          resourceType: "Patient",
          id: firstSearchMatch!.id,
        });
      });
    });

    describe("type", () => {
      it("returns empty types on empty bundles", () => {
        const navigator = bundleNavigator(emptyBundle);

        const matches = navigator.type("Patient");

        expect(matches.length).toBe(0);
      });

      it("returns types appropriately", () => {
        const navigator = bundleNavigator(patientsListBundle);

        const patients = navigator.type("Patient");
        const provenance = navigator.type("Provenance");
        const organization = navigator.type("Organization");

        expect(patients.length).toBeGreaterThan(0);
        expect(patients).toMatchObject(
          expect.arrayContaining([
            expect.objectContaining<Patient>({
              resourceType: "Patient",
            }),
          ]),
        );

        expect(provenance.length).toBeGreaterThan(0);
        expect(provenance).toMatchObject(
          expect.arrayContaining([
            expect.objectContaining<Partial<Provenance>>({
              resourceType: "Provenance",
            }),
          ]),
        );

        expect(organization.length).toBeGreaterThan(0);
        expect(organization).toMatchObject(
          expect.arrayContaining([
            expect.objectContaining<Organization>({
              resourceType: "Organization",
            }),
          ]),
        );
      });
    });
  });

  describe("resolvable proxies", () => {
    it("resolve included when found", () => {
      const navigator = bundleNavigator(patientsListBundle);
      const provenance = navigator.type("Provenance")[0]!;
      const patient = provenance.target[0]!.included();
      expect(patient).toBeDefined();
    });

    it("does not resolve included when not found", () => {
      const navigator = bundleNavigator(patientsListBundle);
      const patient = navigator.searchMatch()[0]!;
      const org = patient.managingOrganization?.included();
      expect(org).toBeUndefined();
    });

    it("resolve revincluded when found", () => {
      const navigator = bundleNavigator(patientsListBundle);
      const patient = navigator.searchMatch()[0]!;
      const provenance = patient.revIncluded?.<Provenance>(
        (provenance) => provenance.target,
      )[0];
      expect(provenance).toBeDefined();
      expect(provenance?.resourceType).toBe("Provenance");
      const org = patient
        .revIncluded?.<Provenance>((provenance) => provenance.target)[0]
        ?.agent[0]?.who?.included();
      expect(org).toBeDefined();
      expect(org?.resourceType).toBe("Organization");
    });

    it("should still support JSON serialization", () => {
      const navigator = bundleNavigator(patientsListBundle);
      const provenance = navigator.type("Provenance")[0]!;
      const serialized = JSON.stringify(provenance);
      expect(typeof serialized).toBe("string");
      expect(serialized).not.toContain("included");
    });
  });

  describe("linkUrl", () => {
    it("return the link", () => {
      const navigator = bundleNavigator(patientsListBundle);
      const result = navigator.linkUrl("next");
      expect(result).toBeDefined();
    });

    it("return undefined if not found", () => {
      const navigator = bundleNavigator(patientsListBundle);
      const result = navigator.linkUrl("previous");
      expect(result).toBeUndefined();
    });
  });

  describe("toJSON", () => {
    it("returns the bundle", () => {
      const navigator = bundleNavigator(patientsListBundle);
      const stringified = JSON.stringify(navigator);
      const parsed = JSON.parse(stringified);
      expect(parsed.resourceType).toEqual("Bundle");
    });
  });

  describe("with custom resources", () => {
    const CustomPatient = extendResource("Patient", {
      toto() {
        return "toto";
      },
    });
    const CustomOrganization = extendResource("Organization", {});
    const CustomProvenance = extendResource("Provenance", {});

    it("type", () => {
      const navigator = bundleNavigator(patientsListBundle, CustomPatient);
      const patients = navigator.type(CustomPatient);
      expect(patients.length).toBeTruthy();
      for (const patient of patients) {
        expect(patient).toBeInstanceOf(CustomPatient);
      }

      const organizations = navigator.type(CustomOrganization);
      expect(organizations.length).toBeTruthy();
      for (const organization of organizations) {
        expect(organization).toBeInstanceOf(CustomOrganization);
      }
    });

    it("searchMatch", () => {
      const navigator = bundleNavigator(patientsListBundle, CustomPatient);
      const patients = navigator.searchMatch();
      expect(patients.length).toBeTruthy();
      for (const patient of patients) {
        expect(patient).toBeInstanceOf(CustomPatient);
      }
    });

    it("searchMatchOne", () => {
      const navigator = bundleNavigator(
        {
          ...patientsListBundle,
          entry: [
            patientsListBundle.entry!.find(
              (x) => x.resource?.resourceType === "Patient",
            )!,
            ...(patientsListBundle.entry?.filter(
              (x) => x.resource?.resourceType !== "Patient",
            ) || []),
          ],
        },
        CustomPatient,
      );
      const patient = navigator.searchMatchOne();
      expect(patient).toBeInstanceOf(CustomPatient);
    });

    it("reference", () => {
      const navigator = bundleNavigator(patientsListBundle, CustomPatient);

      const patient = navigator.reference(
        "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f",
      );
      expect(patient).toBeInstanceOf(CustomPatient);

      const patient2 = navigator.reference(
        "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f",
        CustomPatient,
      );
      expect(patient2).toBeInstanceOf(CustomPatient);

      const organization = navigator.reference(
        "Organization/f5c2ed46-d994-33c7-bc9e-c723b8ad24a0",
        CustomOrganization,
      );
      expect(organization).toBeInstanceOf(CustomOrganization);

      expect(() =>
        navigator.reference(
          "Organization/f5c2ed46-d994-33c7-bc9e-c723b8ad24a0",
          CustomPatient,
        ),
      ).toThrowError();
    });

    it("revReference", () => {
      const navigator = bundleNavigator(patientsListBundle, CustomPatient);
      const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";

      const provenancesWithPatientTarget = navigator.revReference(
        (provenance) => provenance.target,
        patientReference,
        CustomProvenance,
      );

      expect(provenancesWithPatientTarget.length).toBeGreaterThan(0);
      for (const provenance of provenancesWithPatientTarget) {
        expect(provenance).toBeInstanceOf(CustomProvenance);
      }
    });

    describe("resolvable proxies with custom types", () => {
      it("resolve included", () => {
        const navigator = bundleNavigator(patientsListBundle);
        const provenance = navigator.type("Provenance")[0]!;
        const patient = provenance.target[0]!.included(CustomPatient);
        expect(patient).toBeInstanceOf(CustomPatient);
      });

      it("resolve revincluded", () => {
        const navigator = bundleNavigator(patientsListBundle);
        const patient = navigator.searchMatch()[0]!;
        const provenance = patient.revIncluded(
          (provenance) => provenance.target,
          CustomProvenance,
        )[0];
        expect(provenance).toBeInstanceOf(CustomProvenance);
      });
    });
  });
});
