import flatten from "lodash/flatten";
import isNil from "lodash/isNil";
import zip from "lodash/zip";
import { fhirAgeTypeAdapter, FhirAgeTypeAdapter } from "./data-types/age";
import {
  FhirBooleanTypeAdapter,
  fhirBooleanTypeAdapter,
} from "./data-types/boolean";
import {
  FhirCanonicalTypeAdapter,
  fhirCanonicalTypeAdapter,
} from "./data-types/canonical";
import { fhirCodeTypeAdapter, FhirCodeTypeAdapter } from "./data-types/code";
import {
  FhirCodeableConceptTypeAdapter,
  fhirCodeableConceptTypeAdapter,
} from "./data-types/codeableConcept";
import {
  fhirCodingTypeAdapter,
  FhirCodingTypeAdapter,
} from "./data-types/coding";
import { FhirCountTypeAdapter, fhirCountTypeAdapter } from "./data-types/count";
import { FhirDateTypeAdapter, fhirDateTypeAdapter } from "./data-types/date";
import {
  FhirDateTimeTypeAdapter,
  fhirDateTimeTypeAdapter,
} from "./data-types/dateTime";
import {
  FhirDecimalTypeAdapter,
  fhirDecimalTypeAdapter,
} from "./data-types/decimal";
import {
  FhirDistanceTypeAdapter,
  fhirDistanceTypeAdapter,
} from "./data-types/distance";
import {
  FhirDurationTypeAdapter,
  fhirDurationTypeAdapter,
} from "./data-types/duration";
import {
  FhirInstantTypeAdapter,
  fhirInstantTypeAdapter,
} from "./data-types/instant";
import {
  FhirIntegerTypeAdapter,
  fhirIntegerTypeAdapter,
} from "./data-types/integer";
import {
  FhirMarkdownTypeAdapter,
  fhirMarkdownTypeAdapter,
} from "./data-types/markdown";
import { fhirMoneyTypeAdapter, FhirMoneyTypeAdapter } from "./data-types/money";
import {
  fhirPeriodTypeAdapter,
  FhirPeriodTypeAdapter,
} from "./data-types/period";
import {
  FhirQuantityTypeAdapter,
  fhirQuantityTypeAdapter,
} from "./data-types/quantity";
import { fhirRangeTypeAdapter, FhirRangeTypeAdapter } from "./data-types/range";
import { fhirRatioTypeAdapter, FhirRatioTypeAdapter } from "./data-types/ratio";
import {
  fhirRatioRangeTypeAdapter,
  FhirRatioRangeTypeAdapter,
} from "./data-types/ratioRange";
import {
  fhirSimpleQuantityTypeAdapter,
  FhirSimpleQuantityTypeAdapter,
} from "./data-types/simpleQuantity";
import { FhirURITypeAdapter, fhirURITypeAdapter } from "./data-types/uri";
import { FhirURLTypeAdapter, fhirURLTypeAdapter } from "./data-types/url";

/**
 * This is used to manipulate FHIR data types, both parsing values and formatting them as localized strings.
 *
 * @see https://hl7.org/fhir/datatypes.html
 */
export interface FhirDataTypeAdapter {
  locale: string | undefined;

  age: FhirAgeTypeAdapter;
  boolean: FhirBooleanTypeAdapter;
  canonical: FhirCanonicalTypeAdapter;
  code: FhirCodeTypeAdapter;
  codeableConcept: FhirCodeableConceptTypeAdapter;
  coding: FhirCodingTypeAdapter;
  count: FhirCountTypeAdapter;
  date: FhirDateTypeAdapter;
  dateTime: FhirDateTimeTypeAdapter;
  decimal: FhirDecimalTypeAdapter;
  distance: FhirDistanceTypeAdapter;
  duration: FhirDurationTypeAdapter;
  instant: FhirInstantTypeAdapter;
  integer: FhirIntegerTypeAdapter;
  markdown: FhirMarkdownTypeAdapter;
  money: FhirMoneyTypeAdapter;
  period: FhirPeriodTypeAdapter;
  quantity: FhirQuantityTypeAdapter;
  range: FhirRangeTypeAdapter;
  ratio: FhirRatioTypeAdapter;
  ratioRange: FhirRatioRangeTypeAdapter;
  simpleQuantity: FhirSimpleQuantityTypeAdapter;
  uri: FhirURITypeAdapter;
  url: FhirURLTypeAdapter;

  message: (
    strings: TemplateStringsArray,
    ...expr: FhirDataTypeAdapterMessageExpression[]
  ) => string;
}

type MessageExpressionAdapter<
  TAdapterName extends keyof Omit<FhirDataTypeAdapter, "locale" | "message">
> =
  | [Parameters<FhirDataTypeAdapter[TAdapterName]["format"]>[0], TAdapterName]
  | [
      Parameters<FhirDataTypeAdapter[TAdapterName]["format"]>[0],
      TAdapterName,
      Parameters<FhirDataTypeAdapter[TAdapterName]["format"]>[1]
    ];

export type FhirDataTypeAdapterMessageExpression =
  | string
  | MessageExpressionAdapter<"age">
  | MessageExpressionAdapter<"boolean">
  | MessageExpressionAdapter<"canonical">
  | MessageExpressionAdapter<"code">
  | MessageExpressionAdapter<"codeableConcept">
  | MessageExpressionAdapter<"coding">
  | MessageExpressionAdapter<"count">
  | MessageExpressionAdapter<"date">
  | MessageExpressionAdapter<"dateTime">
  | MessageExpressionAdapter<"decimal">
  | MessageExpressionAdapter<"distance">
  | MessageExpressionAdapter<"duration">
  | MessageExpressionAdapter<"instant">
  | MessageExpressionAdapter<"integer">
  | MessageExpressionAdapter<"markdown">
  | MessageExpressionAdapter<"money">
  | MessageExpressionAdapter<"period">
  | MessageExpressionAdapter<"quantity">
  | MessageExpressionAdapter<"range">
  | MessageExpressionAdapter<"ratio">
  | MessageExpressionAdapter<"ratioRange">
  | MessageExpressionAdapter<"simpleQuantity">
  | MessageExpressionAdapter<"uri">
  | MessageExpressionAdapter<"url">
  | null
  | undefined;

/**
 * Return a {@link FhirDataTypeAdapter} that uses the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * (ECMAScript Internationalization API)
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function intlFhirDataTypeAdapter(
  locale?: string | undefined
): FhirDataTypeAdapter {
  // JIT locale check
  Intl.DateTimeFormat(locale);

  return {
    locale,
    // primitive types
    code: fhirCodeTypeAdapter(locale),
    date: fhirDateTypeAdapter(locale),
    boolean: fhirBooleanTypeAdapter(locale),
    dateTime: fhirDateTimeTypeAdapter(locale),
    instant: fhirInstantTypeAdapter(locale),
    integer: fhirIntegerTypeAdapter(locale),
    decimal: fhirDecimalTypeAdapter(locale),
    uri: fhirURITypeAdapter(locale),
    url: fhirURLTypeAdapter(locale),
    canonical: fhirCanonicalTypeAdapter(locale),
    markdown: fhirMarkdownTypeAdapter(locale),
    // general-purpose types
    money: fhirMoneyTypeAdapter(locale),
    period: fhirPeriodTypeAdapter(locale),
    count: fhirCountTypeAdapter(locale),
    distance: fhirDistanceTypeAdapter(locale),
    age: fhirAgeTypeAdapter(locale),
    duration: fhirDurationTypeAdapter(locale),
    quantity: fhirQuantityTypeAdapter(locale),
    range: fhirRangeTypeAdapter(locale),
    ratio: fhirRatioTypeAdapter(locale),
    ratioRange: fhirRatioRangeTypeAdapter(locale),
    simpleQuantity: fhirSimpleQuantityTypeAdapter(locale),
    coding: fhirCodingTypeAdapter(locale),
    codeableConcept: fhirCodeableConceptTypeAdapter(locale),

    message(
      strings: TemplateStringsArray,
      ...expr: FhirDataTypeAdapterMessageExpression[]
    ) {
      return flatten(
        zip(
          strings,
          expr.map((x) => renderExpression(this, x))
        )
      ).join("");
    },
  };
}

function renderExpression(
  adapter: FhirDataTypeAdapter,
  value: FhirDataTypeAdapterMessageExpression
) {
  if (isNil(value)) {
    return "";
  }

  if (Array.isArray(value)) {
    const adapterName = value[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valueToFormat: any = value[0];
    const options = value[2];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return adapter[adapterName].format(valueToFormat, options as any);
  }

  return value.toString();
}

export * from "./data-types/date";
