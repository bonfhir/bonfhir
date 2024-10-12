import { Formatter } from "@bonfhir/core/r5";
import {
  createElement,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { FhirUIContext, type OnNavigateArgs } from "./context";
import type { FhirUIDefaultProps } from "./default-props";
import {
  FhirFormatterContext,
  useFhirFormatter,
} from "./formatters/fhir-formatter-context";
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
   * {@link Formatter} to provide to all child components. If omitted, any
   * formatter provided by a parent {@link FhirFormatterProvider} will be used.
   * Failing that, a new default formatter will be created.
   */
  formatter?: Formatter | null | undefined;
  renderer: Partial<FhirUIRenderer>;
  defaultProps?: FhirUIDefaultProps | null | undefined;
  onNavigate?: (args: OnNavigateArgs) => void;
}>;

/**
 * Provide a context for UI components.
 * Should probably be placed near the top of your React app render tree.
 */
export function FhirUIProvider(props: FhirUIProviderProps) {
  const { children, ...otherProps } = props;

  const parentProvidedFormatter = useContext(FhirFormatterContext)?.formatter;
  const formatter = useMemo(
    (): Formatter =>
      props.formatter ?? parentProvidedFormatter ?? Formatter.build(),
    [props.formatter, parentProvidedFormatter],
  );

  // If a `formatter` is explicitly given as a prop or none was given and the
  // formatter is NOT a parent-provided one, we provide it to all child
  // components.
  if (formatter === props.formatter || formatter !== parentProvidedFormatter) {
    return (
      <FhirFormatterProvider formatter={formatter}>
        <FhirUIProviderWrapper {...otherProps}>
          {children}
        </FhirUIProviderWrapper>
      </FhirFormatterProvider>
    );
  }

  // Here, we know the memoized formatter is the parent-provided one so we
  // don't have to provide it ourselves again to all child components as that
  // risks omitting whatever additional options might also have been provided.
  return (
    <FhirUIProviderWrapper {...otherProps}>{children}</FhirUIProviderWrapper>
  );
}
