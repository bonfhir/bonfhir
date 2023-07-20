/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Coding,
  Extension,
  HasExtension,
  SpecialExtension,
} from "@bonfhir/core/r4b";

/**
 * http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity
 */
export const US_CORE_ETHNICITY_URL =
  "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity";

/**
 * http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity
 */
export interface USCoreEthnicity {
  /**
   * The 2 ethnicity category codes according to the [OMB Standards for Maintaining, Collecting, and Presenting Federal Data on Ethnicity and Ethnicity, Statistical Policy Directive No. 15, as revised, October 30, 1997](https://www.govinfo.gov/content/pkg/FR-1997-10-30/pdf/97-28653.pdf).
   */
  ombCategory?: Coding | undefined;

  /**
   * The 900+ CDC race codes that are grouped under one of the 5 OMB race category codes:.
   */
  detailed?: Coding[] | undefined;

  /**
   * Plain text representation of the race concept(s).
   */
  text: string;
}

/**
 * http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity
 */
export function usCoreEthnicity(): USCoreEthnicity | undefined {
  return {
    __isSpecialExtension: true,
    __get(target: HasExtension): USCoreEthnicity | undefined {
      const extensionValue = (target.extension || []).find(
        (x) => x.url === US_CORE_ETHNICITY_URL,
      );

      if (!extensionValue) {
        return;
      }

      return {
        ombCategory: extensionValue.extension?.find(
          (x) => x.url === "ombCategory",
        )?.valueCoding,
        detailed:
          extensionValue.extension
            ?.filter((x) => x.url === "detailed" && x.valueCoding)
            ?.map((x) => x.valueCoding!) || [],
        text:
          extensionValue.extension?.find((x) => x.url === "text")
            ?.valueString || "",
      };
    },
    __set(
      target: HasExtension,
      value: USCoreEthnicity | undefined,
    ): USCoreEthnicity | undefined {
      if (!value) {
        target.extension = target.extension?.filter(
          (x) => x.url !== US_CORE_ETHNICITY_URL,
        );

        if (target.extension?.length === 0) {
          target.extension = undefined;
        }
        return;
      }

      const newExtensionValue = {
        url: US_CORE_ETHNICITY_URL,
        extension: [
          value.ombCategory
            ? {
                url: "ombCategory",
                valueCoding: value.ombCategory,
              }
            : undefined,
          ...(value.detailed || []).map((valueCoding) => ({
            url: "detailed",
            valueCoding,
          })),
          {
            url: "text",
            valueString: value.text,
          },
        ].filter(Boolean) as Extension[],
      };

      target.extension = [
        ...(target.extension?.filter((x) => x.url !== US_CORE_ETHNICITY_URL) ||
          []),
        newExtensionValue,
      ];

      return value;
    },
  } satisfies SpecialExtension as any;
}
