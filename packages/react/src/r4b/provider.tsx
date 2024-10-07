import { Formatter } from "@bonfhir/core/r4b";
import { PropsWithChildren, createElement } from "react";
import { FhirUIContext, OnNavigateArgs } from "./context";
import { FhirUIDefaultProps } from "./default-props";
import { useFhirFormatter } from "./formatters/fhir-formatter-context";
import { FhirFormatterProvider } from "./formatters/provider";
import { FhirUIRenderer } from "./renderer";

// DO NOT EXPORT, this is to support the independent formatters context
type DeprecationWrapperProps = PropsWithChildren<{
  renderer: Partial<FhirUIRenderer>;
  defaultProps?: FhirUIDefaultProps | null | undefined;
  onNavigate?: (args: OnNavigateArgs) => void;
}>;

// DO NOT EXPORT, this is to support the independent formatters context
const FhirUIProviderWrapper: React.FC<DeprecationWrapperProps> = (props) => {
  const { formatter } = useFhirFormatter();

  return (
    <FhirUIContext.Provider
      value={{
        formatter: formatter,
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
   * @deprecated formatter in UI context is deprecated: please @see FhirFormatterProvider and its hook @see useFhirFormatter
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
    //   "[FhirUIProvider] formatters in FhirUIProvider are deprecated, please use FhirFormatterProvider instead.",
    // );

    return (
      <FhirFormatterProvider
        formatter={props.formatter as Formatter | undefined}
      >
        <FhirUIProviderWrapper {...otherProps}>
          {children}
        </FhirUIProviderWrapper>
      </FhirFormatterProvider>
    );
  }

  return (
    <FhirUIProviderWrapper {...otherProps}>{children}</FhirUIProviderWrapper>
  );
}
