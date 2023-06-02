import { Formatter } from "@bonfhir/core/r4b";
import { PropsWithChildren, useMemo } from "react";
import { FhirUIContext } from "./context.js";
import { FhirUIRenderer } from "./renderer.js";

export type FhirUIProviderProps = PropsWithChildren<{
  formatter?: Formatter | null | undefined;
  renderer: FhirUIRenderer;
}>;

/**
 * Provide a context for ui components.
 * Should probably be placed near the top of your React app render tree.
 */
export function FhirUIProvider(props: FhirUIProviderProps) {
  const formatter = useMemo(() => {
    if (props.formatter) {
      return props.formatter;
    }

    return Formatter.default;
  }, [props.formatter]);

  return (
    <FhirUIContext.Provider
      value={{
        formatter,
        renderer: props.renderer,
      }}
    >
      {props.children}
    </FhirUIContext.Provider>
  );
}
