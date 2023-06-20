import { extendResource, extension } from "@bonfhir/core/r4b";

export const CustomPatient = extendResource("Patient", {
  internalNote: extension({
    kind: "valueMarkdown",
    url: "http://acme.org/StructureDefinition/patient-internalNote",
  }),
});

export type CustomPatient = InstanceType<typeof CustomPatient>;
