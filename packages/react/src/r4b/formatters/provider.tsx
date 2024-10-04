import { Formatter, FormatterOptions } from "@bonfhir/core/r4b";
import { useMemo } from "react";
import { FhirFormattersContext } from "./fhir-formatters-context";

export type FhirFormattersProps = {
  formatters?: Formatter;
  options?: FormatterOptions;
  children?: React.ReactNode | React.ReactNode[];
};

/**
 * FhirFormatterProvider: Primary provider for value formatters.
 * Should be placed at the root of your React app if possible, to make your whole app use the same source of formatters.
 * @param formatters you can provide your own formatters implementations, OR
 * @param options you can specify culture (locale), delimiter, etc. without re-implementing the whole thing
 * @param children React descendants
 *
 * @example
 * export const BaseLayout: React.FC = () => {
 *
 *   return (
 *     <FhirFormattersProvider>
 *       ...
 *     </FhirFormattersProvider>
 *   );
 * }
 *
 * @example
 * export const BaseLayout: React.FC = () => {
 *   const [locale, setLocale] = useState<'en' | 'es' | 'fr'>('en');
 *
 *   const handleOnLocaleSwitch = (changedTo: 'en' | 'es' | 'fr') => {
 *     setLocale(changedTo);
 *   };
 *
 *   return (
 *     <FhirFormattersProvider options={{ locale }}>
 *       <button onClick={() => handleOnLocaleSwitch('en')}>EN</button>
 *       <button onClick={() => handleOnLocaleSwitch('es')}>ES</button>
 *       <button onClick={() => handleOnLocaleSwitch('fr')}>FR</button>
 *       ...
 *     </FhirFormattersProvider>
 *   );
 * }
 */
export const FhirFormattersProvider: React.FC<FhirFormattersProps> = ({
  formatters,
  options,
  children,
}) => {
  const wrapped = useMemo(
    () => ({
      formatter: formatters ?? Formatter.build(options),
    }),
    [formatters, options],
  );

  return (
    <FhirFormattersContext.Provider value={wrapped}>
      {children}
    </FhirFormattersContext.Provider>
  );
};
