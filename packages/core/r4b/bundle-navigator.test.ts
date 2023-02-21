/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Bundle, Organization, Patient, Provenance } from "fhir/r4";
import { buildReferenceFromResource } from "./builders";
import { bundleNavigator } from "./bundle-navigator";
import * as patientsListFixture from "./__fixtures__/bundle-navigator.list-patients.test.fhir.json";

describe("BundleNavigator", () => {
  const emptyBundle: Bundle = {
    resourceType: "Bundle",
    type: "searchset",
  };

  const patientsListBundle = patientsListFixture as Bundle<
    Patient | Provenance | Organization
  >;

  describe("reference", () => {
    it("returns undefined when not found", () => {
      const navigator = bundleNavigator(emptyBundle);

      const resource = navigator.reference("unknown_reference");

      expect(resource).toBeUndefined();
    });

    it.each([undefined, undefined, ""])(
      "returns undefined when reference is",
      (value) => {
        const navigator = bundleNavigator<Patient, Provenance | Organization>(
          patientsListBundle
        );

        const result = navigator.reference(value);

        expect(result).toBeUndefined();
      }
    );

    it("returns resources", () => {
      const navigator = bundleNavigator<Patient, Provenance | Organization>(
        patientsListBundle
      );
      const matches = patientsListFixture.entry.filter(
        (x) => x.search.mode == "match"
      );
      const include = patientsListFixture.entry.find(
        (x) => x.search.mode == "include"
      );

      const search1 = navigator.reference(
        buildReferenceFromResource(matches[0]!.resource).reference
      );
      const search2 = navigator.reference(
        buildReferenceFromResource(matches[1]!.resource).reference
      );
      const include1 = navigator.reference(
        buildReferenceFromResource(include!.resource).reference
      );

      expect(search1).toMatchObject(matches[0]!.resource);
      expect(search2).toMatchObject(matches[1]!.resource);
      expect(include1).toMatchObject(include!.resource);
    });

    it("returns from bundle references", () => {
      const navigator = bundleNavigator<Patient, Provenance | Organization>(
        patientsListBundle
      );

      const provenance = navigator.type("Provenance")[0];
      const patientReference = provenance?.target[0]?.reference;
      const targetPatient = navigator.reference(patientReference!);

      expect(patientReference?.length).toBeTruthy();
      expect(targetPatient).not.toBeUndefined();
    });
  });

  describe("revReference", () => {
    it("returns a revinclude reference", () => {
      const navigator = bundleNavigator<Patient, Provenance | Organization>(
        patientsListBundle
      );
      const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";
      const expectedProvenance = patientsListFixture.entry.find(
        (x) =>
          x.resource?.resourceType === "Provenance" &&
          (x.resource as Provenance).target[0]!.reference === patientReference
      )!.resource;

      const provenanceWithPatientTarget = navigator.revReference<Provenance>(
        "ofType(Provenance).target.reference",
        patientReference
      );

      expect(expectedProvenance).not.toBeUndefined();
      expect(provenanceWithPatientTarget).toMatchObject(
        expect.arrayContaining([expectedProvenance])
      );
    });

    it("returns an empty array when not found", () => {
      const navigator = bundleNavigator(emptyBundle);
      const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";

      const provenanceWithPatientTarget = navigator.revReference<Provenance>(
        "ofType(Provenance).target.reference",
        patientReference
      );

      expect(provenanceWithPatientTarget.length).toBe(0);
    });

    it.each([undefined, undefined, ""])(
      "returns an empty array when reference is",
      (patientReference) => {
        const navigator = bundleNavigator<Patient, Provenance | Organization>(
          patientsListBundle
        );

        const result = navigator.revReference<Provenance>(
          "ofType(Provenance).target.reference",
          patientReference
        );

        expect(result.length).toBe(0);
      }
    );
  });

  describe("firstRevReference", () => {
    it("returns a revinclude reference", () => {
      const navigator = bundleNavigator<Patient, Provenance | Organization>(
        patientsListBundle
      );
      const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";
      const expectedProvenance = patientsListFixture.entry.find(
        (x) =>
          x.resource?.resourceType === "Provenance" &&
          (x.resource as Provenance).target[0]!.reference === patientReference
      )!.resource;

      const provenanceWithPatientTarget =
        navigator.firstRevReference<Provenance>(
          "ofType(Provenance).target.reference",
          patientReference
        );

      expect(expectedProvenance).not.toBeUndefined();
      expect(provenanceWithPatientTarget).toMatchObject(expectedProvenance);
    });

    it("returns a undefined when not found", () => {
      const navigator = bundleNavigator(emptyBundle);
      const patientReference = "Patient/23af4168-fc91-4b4d-a498-4485ce5ebc6f";

      const provenanceWithPatientTarget =
        navigator.firstRevReference<Provenance>(
          "ofType(Provenance).target.reference",
          patientReference
        );

      expect(provenanceWithPatientTarget).toBeUndefined();
    });

    it.each([undefined, undefined, ""])(
      "returns undefined when reference is",
      (patientReference) => {
        const navigator = bundleNavigator<Patient, Provenance | Organization>(
          patientsListBundle
        );

        const result = navigator.firstRevReference<Provenance>(
          "ofType(Provenance).target.reference",
          patientReference
        );

        expect(result).toBeUndefined();
      }
    );
  });

  describe("searchMatch", () => {
    it("returns empty matches on empty bundles", () => {
      const navigator = bundleNavigator(emptyBundle);

      const matches = navigator.searchMatch();

      expect(matches.length).toBe(0);
    });

    it("returns matches", () => {
      const navigator = bundleNavigator<Patient, Provenance | Organization>(
        patientsListBundle
      );

      const matches = navigator.searchMatch();

      expect(matches.length).toBeGreaterThan(0);
      expect(matches).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining<Patient>({
            resourceType: "Patient",
          }),
        ])
      );
    });
  });

  describe("firstSearchMatch", () => {
    it("returns undefined on firstSearchMatch on empty bundles", () => {
      const navigator = bundleNavigator(emptyBundle);

      const firstSearchMatch = navigator.firstSearchMatch();

      expect(firstSearchMatch).toBeUndefined();
      expect(firstSearchMatch).toBeUndefined();
    });

    it("returns firstSearchMatch consistently", () => {
      const navigator = bundleNavigator<Patient, Provenance | Organization>(
        patientsListBundle
      );

      const firstSearchMatch = navigator.firstSearchMatch();
      const firstSearchMatchSecondTime = navigator.firstSearchMatch();

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
      const navigator = bundleNavigator<Patient, Provenance | Organization>(
        patientsListBundle
      );

      const patients = navigator.type("Patient");
      const provenance = navigator.type("Provenance");
      const organization = navigator.type("Organization");

      expect(patients.length).toBeGreaterThan(0);
      expect(patients).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining<Patient>({
            resourceType: "Patient",
          }),
        ])
      );

      expect(provenance.length).toBeGreaterThan(0);
      expect(provenance).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining<Partial<Provenance>>({
            resourceType: "Provenance",
          }),
        ])
      );

      expect(organization.length).toBeGreaterThan(0);
      expect(organization).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining<Organization>({
            resourceType: "Organization",
          }),
        ])
      );
    });
  });

  describe("resources", () => {
    it("returns all the resources", () => {
      const navigator = bundleNavigator<Patient, Provenance | Organization>(
        patientsListBundle
      );

      expect([...navigator.resources]).toHaveLength(102);
    });

    describe("for an empty bundle", () => {
      it("returns an empty array", () => {
        const navigator = bundleNavigator(emptyBundle);

        expect([...navigator.resources]).toStrictEqual([]);
      });
    });
  });
});
