import { Formatter, type FormatterOptions } from "@bonfhir/core/r5";
import { useMemo, type ReactNode } from "react";
import {
  FhirFormatterContext,
  type FhirFormatterDefinition,
} from "./fhir-formatter-context";

export type FhirFormatterProviderProps = {
  formatter?: Formatter;
  options?: FormatterOptions;
  children?: ReactNode;
};

/**
 * FhirFormatterProvider: Primary provider for value formatters.
 * Should be placed at the root of your React app if possible, to make your whole app use the same source of formatters.
 * @param formatters you can provide your own formatter implementations, OR
 * @param options you can specify culture (locale), delimiter, etc. without re-implementing the whole thing
 * @param children React descendants
 *
 * @example
 * export const BaseLayout: React.FC = () => {
 *
 *   return (
 *     <FhirFormatterProvider>
 *       ...
 *     </FhirFormatterProvider>
 *   );
 * }
 *
 * @example
 * export const BaseLayout: React.FC = () => {
 *   const [locale, setLocale] = useState<'en' | 'es' | 'fr'>('en');
 *
 *   return (
 *     <FhirFormatterProvider options={{ locale }}>
 *       <button onClick={() => setLocale('en')}>EN</button>
 *       <button onClick={() => setLocale('es')}>ES</button>
 *       <button onClick={() => setLocale('fr')}>FR</button>
 *       ...
 *     </FhirFormatterProvider>
 *   );
 * }
 */
export const FhirFormatterProvider: React.FC<FhirFormatterProviderProps> = ({
  formatter,
  options,
  children,
}) => {
  const wrapped = useMemo(
    (): FhirFormatterDefinition => ({
      formatter: formatter ?? Formatter.build(options),
    }),
    [formatter, options],
  );

  return (
    <FhirFormatterContext.Provider value={wrapped}>
      {children}
    </FhirFormatterContext.Provider>
  );
};
