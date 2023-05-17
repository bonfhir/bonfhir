import organization from "../../fixtures/narratives/organization-example.json";
import patient from "../../fixtures/narratives/patient-example.fhir.json";
import { AnyDomainResource } from "./fhir-types.codegen";
import { narrative } from "./narratives.codegen";

describe("narrative", () => {
  it.each(<Array<AnyDomainResource>>[patient, organization])(
    "narrative $resourceType",
    (resource) => {
      const result = narrative(resource);
      expect(result).toMatchSnapshot();
    }
  );
});
