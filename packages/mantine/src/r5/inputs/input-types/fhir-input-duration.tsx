import { FhirInput, FhirInputDurationRendererProps } from "@bonfhir/react/r5";
import { ReactElement } from "react";
import { MantineFhirInputQuantityProps } from "./fhir-input-quantity";

export function MantineFhirInputDuration(
  props: FhirInputDurationRendererProps<MantineFhirInputDurationProps>,
): ReactElement | null {
  const { type, ...remainingProps } = props;
  if (!remainingProps.decimal) {
    remainingProps.decimal = {
      precision: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }
  if (!remainingProps.unit) {
    remainingProps.unit = {
      source: [
        {
          display: "ms",
          system: "http://unitsofmeasure.org",
          code: "ms",
        },
        { display: "s", system: "http://unitsofmeasure.org", code: "s" },
        { display: "min", system: "http://unitsofmeasure.org", code: "min" },
        { display: "h", system: "http://unitsofmeasure.org", code: "h" },
        { display: "d", system: "http://unitsofmeasure.org", code: "d" },
        { display: "mo", system: "http://unitsofmeasure.org", code: "mo" },
        {
          display: "yr",
          system: "http://unitsofmeasure.org",
          code: "a",
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }
  return <FhirInput type="Quantity" {...remainingProps} />;
}

export type MantineFhirInputDurationProps = MantineFhirInputQuantityProps;
