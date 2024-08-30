import {
  CommonFormatterOptions,
  ValueFormatter,
  valueFormatters,
} from "@bonfhir/core/r4b";
import DOMPurify from "dompurify";
import { ReactElement } from "react";
import { useFhirUIContext } from "../context";
import { useFhirFormatters } from "../formatters";

export type FhirValueProps<TRendererProps = any> =
  DefaultFormatterParametersProps & {
    className?: string | undefined;
    style?: Record<string, any> | undefined;
    rendererProps?: TRendererProps;
  };

export type ValueFormatterParametersAsProps<TValueFormatter> =
  TValueFormatter extends ValueFormatter<
    infer TType,
    infer TValue,
    infer TOptions
  >
    ? {
        type: TType;
        value: TValue | null | undefined;
        options?: (TOptions & CommonFormatterOptions) | null | undefined;
      }
    : never;

/**
 * Default formatters parameters as an array of objects.
 */
export type DefaultFormatterParametersProps =
  | ValueFormatterParametersAsProps<typeof valueFormatters.addressFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.ageFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.booleanFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.canonicalFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.choiceFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.codeFormatter>
  | ValueFormatterParametersAsProps<
      typeof valueFormatters.codeableConceptFormatter
    >
  | ValueFormatterParametersAsProps<typeof valueFormatters.codingFormatter>
  | ValueFormatterParametersAsProps<
      typeof valueFormatters.contactPointFormatter
    >
  | ValueFormatterParametersAsProps<typeof valueFormatters.countFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.dateFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.dateTimeFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.decimalFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.distanceFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.durationFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.fhirPathFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.humanNameFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.idFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.identifierFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.instantFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.integerFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.markdownFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.moneyFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.oidFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.periodFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.positiveIntFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.quantityFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.rangeFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.ratioFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.ratioRangeFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.referenceFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.stringFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.timeFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.unsignedIntFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.uriFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.urlFormatter>
  | ValueFormatterParametersAsProps<typeof valueFormatters.uuidFormatter>;

/**
 * @note HTML generated from Markdown content with `style: "html"` will NOT be
 * sanitized against XSS attacks in React Native environments. Consider using a
 * different `style` or provide a renderer that handles the generated HTML
 * carefully if this is a concern.
 */
export function FhirValue<TRendererProps = any>(
  props: FhirValueProps<TRendererProps>,
): ReactElement<any, any> | null {
  const formatter = useFhirFormatters();
  const { applyDefaultProps, render } = useFhirUIContext();
  props = applyDefaultProps("FhirValue", props);

  let formattedValue = formatter.format(props.type, props.value, props.options);

  if (
    props.type === "markdown" &&
    props.options?.style === "html" &&
    DOMPurify.isSupported
  ) {
    formattedValue = DOMPurify.sanitize(formattedValue);
  }

  return render<FhirValueRendererProps>("FhirValue", {
    ...props,
    formattedValue,
  });
}

export type FhirValueRendererProps<TRendererProps = any> =
  FhirValueProps<TRendererProps> & {
    formattedValue: string;
  };

export type FhirValueRenderer = (
  props: FhirValueRendererProps,
) => ReactElement | null;
