import { Formatter } from "@bonfhir/core/r5";
import { PropsWithChildren, createElement, useMemo } from "react";
import { FhirUIContext, OnNavigateArgs } from "./context.js";
import { FhirUIDefaultProps } from "./default-props.js";
import { FhirUIRenderer } from "./renderer.js";

export type FhirUIProviderProps = PropsWithChildren<{
  formatter?: Formatter | null | undefined;
  renderer: Partial<FhirUIRenderer>;
  defaultProps?: FhirUIDefaultProps | null | undefined;
  onNavigate?: (args: OnNavigateArgs) => void;
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
        onNavigate: props.onNavigate,
        render(rendererName, rendererProps) {
          const renderer = props.renderer[rendererName];
          if (!renderer) {
            throw new Error(`Renderer "${renderer}" not found`);
          }
          return createElement(renderer as any, rendererProps as any);
        },
        applyDefaultProps<TProps>(
          component: keyof FhirUIDefaultProps,
          componentProps: TProps
        ): TProps {
          const configuredDefaultProps = props.defaultProps?.[component];
          if (!configuredDefaultProps) {
            return componentProps;
          }

          return typeof configuredDefaultProps === "function"
            ? (configuredDefaultProps(componentProps as any) as any)
            : { ...configuredDefaultProps, ...componentProps };
        },
      }}
    >
      {props.children}
    </FhirUIContext.Provider>
  );
}
