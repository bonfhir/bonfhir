import { FhirUIRenderer } from "@bonfhir/ui/r5";
import { MantineFhirTable, MantineFhirValue } from "./data-display/index.js";
import { MantineFhirQueryLoader } from "./feedback/index.js";
import {
  MantineFhirInputArray,
  MantineFhirInputBoolean,
  MantineFhirInputDate,
  MantineFhirInputDateTime,
  MantineFhirInputHumanName,
  MantineFhirInputNumber,
  MantineFhirInputString,
  MantineFhirInputTerminology,
} from "./inputs/index.js";
import { MantineFhirPagination } from "./navigation/index.js";

export const MantineRenderer: FhirUIRenderer = {
  FhirInputArray: MantineFhirInputArray,
  FhirInputBoolean: MantineFhirInputBoolean,
  FhirInputDate: MantineFhirInputDate,
  FhirInputDateTime: MantineFhirInputDateTime,
  FhirInputHumanName: MantineFhirInputHumanName,
  FhirInputNumber: MantineFhirInputNumber,
  FhirInputString: MantineFhirInputString,
  FhirInputTerminology: MantineFhirInputTerminology,
  FhirPagination: MantineFhirPagination,
  FhirQueryLoader: MantineFhirQueryLoader,
  FhirTable: MantineFhirTable,
  FhirValue: MantineFhirValue,
};
