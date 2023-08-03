import { CommandBuilder } from "yargs";

export type FhirVersion = "r4b" | "r5";

export interface FhirVersionCommandOptions {
  fhir: FhirVersion;
}

export const FhirVersionCommandBuilder: CommandBuilder<
  unknown,
  FhirVersionCommandOptions
> = {
  fhir: {
    type: "string",
    choices: ["r4b", "r5"],
    default: "r4b",
    describe: "The FHIR version to use (e.g. r4b, r5...)",
  },
};
