import { ReactNode } from "react";

export interface FhirInputCommonProps {
  label?: ReactNode | null | undefined;
  description?: ReactNode | null | undefined;
  error?: ReactNode | null | undefined;
  required?: boolean | null | undefined;
}
