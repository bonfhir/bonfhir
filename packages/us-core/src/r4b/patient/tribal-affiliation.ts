/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CodeableConcept,
  Extension,
  HasExtension,
  SpecialExtension,
} from "@bonfhir/core/r4b";

/**
 * http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation
 */
export const US_CORE_TRIBAL_AFFILIATION_URL =
  "http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation";

/**
 * http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation
 */
export interface USCoreTribalAffiliation {
  /**
   * Affiliated tribe or band name.
   * http://terminology.hl7.org/ValueSet/v3-TribalEntityUS
   */
  tribalAffiliation?: CodeableConcept | undefined;

  /**
   * Whether the individual is an enrolled tribe member.
   */
  isEnrolled?: boolean | undefined;
}

/**
 * http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation
 */
export function usCoreTribalAffiliation(): USCoreTribalAffiliation | undefined {
  return {
    __isSpecialExtension: true,
    __get(target: HasExtension): USCoreTribalAffiliation | undefined {
      const extensionValue = (target.extension || []).find(
        (x) => x.url === US_CORE_TRIBAL_AFFILIATION_URL,
      );

      if (!extensionValue) {
        return;
      }

      return {
        tribalAffiliation: extensionValue.extension?.find(
          (x) => x.url === "tribalAffiliation",
        )?.valueCodeableConcept,
        isEnrolled: extensionValue.extension?.find(
          (x) => x.url === "isEnrolled",
        )?.valueBoolean,
      };
    },
    __set(
      target: HasExtension,
      value: USCoreTribalAffiliation | undefined,
    ): USCoreTribalAffiliation | undefined {
      if (!value) {
        target.extension = target.extension?.filter(
          (x) => x.url !== US_CORE_TRIBAL_AFFILIATION_URL,
        );

        if (target.extension?.length === 0) {
          target.extension = undefined;
        }
        return;
      }

      let newExtensionValue: Extension | undefined = {
        url: US_CORE_TRIBAL_AFFILIATION_URL,
        extension: [
          value.tribalAffiliation
            ? {
                url: "tribalAffiliation",
                valueCodeableConcept: value.tribalAffiliation,
              }
            : undefined,
          value.isEnrolled == undefined
            ? undefined
            : {
                url: "isEnrolled",
                valueBoolean: value.isEnrolled,
              },
        ].filter(Boolean) as Extension[],
      };

      if (newExtensionValue.extension?.length === 0) {
        newExtensionValue = undefined;
      }

      target.extension = [
        ...(target.extension?.filter(
          (x) => x.url !== US_CORE_TRIBAL_AFFILIATION_URL,
        ) || []),
        newExtensionValue,
      ].filter(Boolean) as Extension[];

      return value;
    },
  } satisfies SpecialExtension as any;
}
