import conceptMap from "../../fixtures/conceptmap-example.fhir.json";
import organization from "../../fixtures/organization-example.fhir.json";
import patient from "../../fixtures/patient-example.fhir.json";
import { AnyDomainResource } from "./fhir-types.codegen";
import { narrative } from "./narratives.codegen";

describe("narrative", () => {
  it.each(<Array<AnyDomainResource>>[patient, organization, conceptMap])(
    "generate ($resourceType)",
    (resource) => {
      const result = narrative(resource);
      expect(result).toMatchSnapshot();
    }
  );
});
