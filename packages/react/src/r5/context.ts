import { DefaultFormatter } from "@bonfhir/core/r5";
import { ReactElement, createContext } from "react";
import { FhirUIDefaultProps } from "./default-props";
import { FhirUIRenderer } from "./renderer";

export interface FhirUIContext {
  /**
   * @deprecated formatter in UI context is deprecated: please @see FhirFormatterProvider and its hook @see useFhirFormatters
   */
  formatter: DefaultFormatter;
  renderer: Partial<FhirUIRenderer>;
  defaultProps?: FhirUIDefaultProps | null | undefined;
  onNavigate?: (args: OnNavigateArgs) => void;
  render<TRendererProps>(
    renderer: keyof FhirUIRenderer,
    props: TRendererProps,
  ): ReactElement<any, any> | null;
  applyDefaultProps<TProps>(
    component: keyof FhirUIDefaultProps,
    props: TProps,
  ): TProps;
}

/**
 * The context used by FHIR UI Components.
 */
export const FhirUIContext = createContext<FhirUIContext>({} as FhirUIContext);

export interface OnNavigateArgs {
  target: string;
  aux: boolean;
}
