import { FhirUIRenderer } from "@bonfhir/ui/r4b";
import { MantineFhirTable, MantineFhirValue } from "./data-display/index.js";
import { MantineFhirQueryLoader } from "./feedback/index.js";
import {
  MantineFhirInputBoolean,
  MantineFhirInputCode,
  MantineFhirInputCodeableConcept,
  MantineFhirInputCoding,
  MantineFhirInputDate,
  MantineFhirInputDateTime,
  MantineFhirInputHumanName,
  MantineFhirInputString,
} from "./inputs/index.js";
import { MantineFhirInputNumber } from "./inputs/input-types/fhir-input-number.js";
import { MantineFhirPagination } from "./navigation/index.js";

export const MantineRenderer: FhirUIRenderer = {
  FhirInputBoolean: MantineFhirInputBoolean,
  FhirInputCode: MantineFhirInputCode,
  FhirInputCoding: MantineFhirInputCoding,
  FhirInputCodeableConcept: MantineFhirInputCodeableConcept,
  FhirInputDate: MantineFhirInputDate,
  FhirInputDateTime: MantineFhirInputDateTime,
  FhirInputHumanName: MantineFhirInputHumanName,
  FhirInputNumber: MantineFhirInputNumber,
  FhirInputString: MantineFhirInputString,
  FhirPagination: MantineFhirPagination,
  FhirQueryLoader: MantineFhirQueryLoader,
  FhirTable: MantineFhirTable,
  FhirValue: MantineFhirValue,
};
