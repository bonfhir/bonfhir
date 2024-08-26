import { Formatter } from "@bonfhir/core/r5";
import { PropsWithChildren, createElement } from "react";
import { FhirUIContext, OnNavigateArgs } from "./context";
import { FhirUIDefaultProps } from "./default-props";
import { useFhirFormatters } from "./formatters/fhir-formatters-context";
import { FhirFormattersProvider } from "./formatters/provider";
import { FhirUIRenderer } from "./renderer";

// DO NOT EXPORT, this is to support the independent formatters context
type DeprecationWrapperProps = PropsWithChildren<{
  renderer: Partial<FhirUIRenderer>;
  defaultProps?: FhirUIDefaultProps | null | undefined;
  onNavigate?: (args: OnNavigateArgs) => void;
}>;

// DO NOT EXPORT, this is to support the independent formatters context
const FhirUIProviderWrapper: React.FC<DeprecationWrapperProps> = (props) => {
  const formatters = useFhirFormatters();

  return (
    <FhirUIContext.Provider
      value={{
        formatter: formatters,
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
          componentProps: TProps,
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
};

export type FhirUIProviderProps = PropsWithChildren<{
  /**
   * @deprecated formatter in UI context is deprecated: please @see FhirFormattersProvider and its hook @see useFhirFormatters
   */
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
  const { children, ...otherProps } = props;

  if (props.formatter) {
    // Logger?.warn(
    //   "[FhirUIProvider] formatters in FhirUIProvider are deprecated, please use FhirFormattersProvider instead.",
    // );

    return (
      <FhirFormattersProvider
        formatters={props.formatter as Formatter | undefined}
      >
        <FhirUIProviderWrapper {...otherProps}>
          {children}
        </FhirUIProviderWrapper>
      </FhirFormattersProvider>
    );
  }

  return (
    <FhirUIProviderWrapper {...otherProps}>{children}</FhirUIProviderWrapper>
  );
}
