/* eslint-disable @typescript-eslint/no-explicit-any */
import { Coding, HasExtension, SpecialExtension } from "@bonfhir/core/r5";

/**
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-race.html
 */
export const US_CORE_RACE_URL =
  "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race";

/**
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-race.html
 */
export interface USCoreRace {
  /**
   * The 5 race category codes according to the [OMB Standards for Maintaining, Collecting, and Presenting Federal Data on Race and Ethnicity, Statistical Policy Directive No. 15, as revised, October 30, 1997](https://www.govinfo.gov/content/pkg/FR-1997-10-30/pdf/97-28653.pdf).
   */
  ombCategory?: Coding[] | undefined;

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
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-race.html
 */
export function usCoreRace(): USCoreRace | undefined {
  return {
    __isSpecialExtension: true,
    __get(target: HasExtension): USCoreRace | undefined {
      const extensionValue = (target.extension || []).find(
        (x) => x.url === US_CORE_RACE_URL,
      );

      if (!extensionValue) {
        return;
      }

      return {
        ombCategory:
          extensionValue.extension
            ?.filter((x) => x.url === "ombCategory" && x.valueCoding)
            ?.map((x) => x.valueCoding!) || [],
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
      value: USCoreRace | undefined,
    ): USCoreRace | undefined {
      if (!value) {
        target.extension = target.extension?.filter(
          (x) => x.url !== US_CORE_RACE_URL,
        );

        if (target.extension?.length === 0) {
          target.extension = undefined;
        }
        return;
      }

      const newExtensionValue = {
        url: US_CORE_RACE_URL,
        extension: [
          ...(value.ombCategory || []).map((valueCoding) => ({
            url: "ombCategory",
            valueCoding,
          })),
          ...(value.detailed || []).map((valueCoding) => ({
            url: "detailed",
            valueCoding,
          })),
          {
            url: "text",
            valueString: value.text,
          },
        ],
      };

      target.extension = [
        ...(target.extension?.filter((x) => x.url !== US_CORE_RACE_URL) || []),
        newExtensionValue,
      ];

      return value;
    },
  } satisfies SpecialExtension as any;
}
