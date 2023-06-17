import { extendResource, getSetExtension } from "@bonfhir/core/r4b";

export const CustomPatient = extendResource("Patient", {
  internalNote(value?: string | null | undefined) {
    return getSetExtension(
      this,
      {
        kind: "valueMarkdown",
        url: "http://acme.org/StructureDefinition/patient-internalNote",
      },
      value
    );
  },
});
