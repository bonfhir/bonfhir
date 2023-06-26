import { DefaultFormatter } from "@bonfhir/core/r4b";
import { ReactElement, createContext, useContext } from "react";
import { FhirUIDefaultProps } from "./default-props.js";
import { FhirUIRenderer } from "./renderer.js";

export interface FhirUIContext {
  formatter: DefaultFormatter;
  renderer: Partial<FhirUIRenderer>;
  defaultProps?: FhirUIDefaultProps | null | undefined;
  onNavigate?: (args: OnNavigateArgs) => void;
  render<TRendererProps>(
    renderer: keyof FhirUIRenderer,
    props: TRendererProps
  ): ReactElement<any, any> | null;
  applyDefaultProps<TProps>(
    component: keyof FhirUIDefaultProps,
    props: TProps
  ): TProps;
}

/**
 * The context used by FHIR UI Components.
 */
export const FhirUIContext = createContext<FhirUIContext | undefined>(
  undefined
);

/**
 * Get the current {@link FhirUIContext}.
 *
 * @throws Error if no parent context exists (a.k.a. no `FhirUIProvider` was used in the parent tree).
 */
export const useFhirUIContext = (): FhirUIContext => {
  const context = useContext(FhirUIContext);
  if (!context) {
    throw new Error(
      "Missing FhirUIContext. Did you forget to use a parent FhirUIProvider?"
    );
  }

  return context;
};

export interface OnNavigateArgs {
  target: string;
  aux: boolean;
}
