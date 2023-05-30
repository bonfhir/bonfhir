import {
  BooleanLabels,
  IdentifierFormatterOptions,
  addressFormatter,
  ageFormatter,
  booleanFormatter,
  canonicalFormatter,
  codeFormatter,
  codeableConceptFormatter,
  codingFormatter,
  contactPointFormatter,
  countFormatter,
  dateFormatter,
  dateTimeFormatter,
  decimalFormatter,
  distanceFormatter,
  durationFormatter,
  fhirPathFormatter,
  humanNameFormatter,
  idFormatter,
  identifierFormatter,
  instantFormatter,
  integer64Formatter,
  integerFormatter,
  markdownFormatter,
  moneyFormatter,
  oidFormatter,
  periodFormatter,
  positiveIntFormatter,
  quantityFormatter,
  rangeFormatter,
  ratioFormatter,
  referenceFormatter,
  stringFormatter,
  timeFormatter,
  unsignedIntFormatter,
  uriFormatter,
  urlFormatter,
  uuidFormatter,
} from "./value-formatters/index.js";

/**
 * A value formatter is a function that takes a value and returns a string.
 * Its intent is to be composed with other formatters.
 */
export interface ValueFormatter<TType extends string, TValue, TOptions> {
  type: TType;
  format: (
    value: TValue,
    options: TOptions | null | undefined,
    formatterOptions: { formatter: Formatter } & (
      | FormatterOptions
      | null
      | undefined
    )
  ) => string;
}

/**
 * Extends the base Formatter type with an overload of the format function that fits the ValueFormatter.
 */
export type WithTypedFormatFunction<
  TValueFormatter,
  TThis extends Formatter = Formatter
> = TValueFormatter extends ValueFormatter<
  infer TType,
  infer TValue,
  infer TOptions
>
  ? {
      format(
        type: TType,
        value: TValue,
        options?: TOptions | null | undefined
      ): string;
    } & TThis
  : never;

/** Cast the formatter as if it has the format overload of TValueParameter format. */
export function withValueFormatter<TValueFormatter>(
  formatter: Formatter
): WithTypedFormatFunction<TValueFormatter> {
  return formatter as WithTypedFormatFunction<TValueFormatter>;
}

export interface FormatterOptions {
  /**
   * The locale to use when formatting values.
   * If not provided, will use the ambient value.
   */
  locale?: string | undefined;

  /**
   * The default labels to use for boolean values.
   */
  booleanLabels?: BooleanLabels | null | undefined;

  /**
   * The default labels to use for system values.
   */
  systemsLabels?:
    | IdentifierFormatterOptions["systemsLabels"]
    | null
    | undefined;

  /**
   * The default quantity separator to use.
   */
  quantitySeparator?: string | null | undefined;

  /**
   * The default range separator to use.
   */
  rangeSeparator?: string | null | undefined;

  /**
   * The default denominator separator to use.
   */
  denominatorSeparator?: string | null | undefined;
}

export class Formatter {
  /** Build a new formatter with the default value formatters registered. */
  public static build(options?: FormatterOptions | null | undefined) {
    return (
      new Formatter(options)
        .register(addressFormatter)
        .register(ageFormatter)
        .register(booleanFormatter)
        .register(canonicalFormatter)
        .register(codeFormatter)
        .register(codeableConceptFormatter)
        .register(codingFormatter)
        .register(contactPointFormatter)
        .register(countFormatter)
        .register(dateFormatter)
        .register(dateTimeFormatter)
        .register(decimalFormatter)
        .register(distanceFormatter)
        .register(durationFormatter)
        .register(fhirPathFormatter)
        .register(humanNameFormatter)
        .register(idFormatter)
        .register(identifierFormatter)
        .register(instantFormatter)
        .register(integerFormatter)
        // #if fhir >= r5
        .register(integer64Formatter)
        // #endif
        .register(markdownFormatter)
        .register(moneyFormatter)
        .register(oidFormatter)
        .register(periodFormatter)
        .register(positiveIntFormatter)
        .register(quantityFormatter)
        .register(rangeFormatter)
        .register(ratioFormatter)
        .register(referenceFormatter)
        .register(stringFormatter)
        .register(timeFormatter)
        .register(unsignedIntFormatter)
        .register(uriFormatter)
        .register(urlFormatter)
        .register(uuidFormatter)
    );
  }

  private static _default: Formatter | undefined;

  /**
   * Default instance of the formatter.
   * Use the ambient locale and default options.
   */
  public static get default(): DefaultFormatter {
    return this._default ?? (this._default = this.build());
  }

  /**
   * Modify the default instance of the formatter.
   */
  public static set default(value: Formatter | undefined) {
    this._default = value;
  }

  private readonly _formatters = new Map<
    string,
    ValueFormatter<string, unknown, unknown>
  >();

  constructor(public readonly options?: FormatterOptions | null | undefined) {}

  /**
   * Format a value using the specified type and options.
   */
  public format(
    type: string,
    value: never,
    options?: never | null | undefined
  ): string {
    const valueFormatter = this._formatters.get(type);
    if (!valueFormatter) {
      throw new Error(`No formatter found for type '${type}'`);
    }

    return valueFormatter.format(value, options, {
      formatter: this,
      ...this.options,
    });
  }

  /**
   * Tag template option that can be used to format values.
   */
  public message(
    strings: TemplateStringsArray,
    ...expr: Array<DefaultFormatterParameters | string | number>
  ): string {
    const renderedExpressions = expr.map((value) => {
      if (value == undefined) {
        return "";
      }

      if (Array.isArray(value)) {
        const formatterName = value[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valueToFormat: any = value[1];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options: any = value[2];

        return this.format(formatterName, valueToFormat as never, options);
      }

      return value.toString();
    });
    return strings
      .flatMap((str, idx) => [str, renderedExpressions[idx]])
      .join("");
  }

  /**
   * Return true if this formatter can format the specified type.
   */
  public canFormat(type: string) {
    return this._formatters.has(type);
  }

  /**
   * Register an additional {@link ValueFormatter} with this formatter,
   * and return this instance with the added format signature.
   */
  public register<TValueFormatter>(
    valueFormatter: TValueFormatter
  ): WithTypedFormatFunction<TValueFormatter, this> {
    this._formatters.set(
      (valueFormatter as ValueFormatter<string, unknown, unknown>).type,
      valueFormatter as ValueFormatter<string, unknown, unknown>
    );
    return this as WithTypedFormatFunction<TValueFormatter, this>;
  }
}

/**
 * The default formatter type - with all the default value formatters registered.
 */
export type DefaultFormatter = ReturnType<(typeof Formatter)["build"]>;

export type ValueFormatterParameters<TValueFormatter> =
  TValueFormatter extends ValueFormatter<
    infer TType,
    infer TValue,
    infer TOptions
  >
    ? [TType, TValue] | [TType, TValue, TOptions]
    : never;

/**
 * Default formatters parameters as an array of tuples.
 */
export type DefaultFormatterParameters =
  | ValueFormatterParameters<typeof addressFormatter>
  | ValueFormatterParameters<typeof ageFormatter>
  | ValueFormatterParameters<typeof booleanFormatter>
  | ValueFormatterParameters<typeof canonicalFormatter>
  | ValueFormatterParameters<typeof codeFormatter>
  | ValueFormatterParameters<typeof codeableConceptFormatter>
  | ValueFormatterParameters<typeof codingFormatter>
  | ValueFormatterParameters<typeof contactPointFormatter>
  | ValueFormatterParameters<typeof countFormatter>
  | ValueFormatterParameters<typeof dateFormatter>
  | ValueFormatterParameters<typeof dateTimeFormatter>
  | ValueFormatterParameters<typeof decimalFormatter>
  | ValueFormatterParameters<typeof distanceFormatter>
  | ValueFormatterParameters<typeof durationFormatter>
  | ValueFormatterParameters<typeof fhirPathFormatter>
  | ValueFormatterParameters<typeof humanNameFormatter>
  | ValueFormatterParameters<typeof idFormatter>
  | ValueFormatterParameters<typeof identifierFormatter>
  | ValueFormatterParameters<typeof instantFormatter>
  | ValueFormatterParameters<typeof integerFormatter>
  // #if fhir >= r5
  | ValueFormatterParameters<typeof integer64Formatter>
  // #endif
  | ValueFormatterParameters<typeof markdownFormatter>
  | ValueFormatterParameters<typeof moneyFormatter>
  | ValueFormatterParameters<typeof oidFormatter>
  | ValueFormatterParameters<typeof periodFormatter>
  | ValueFormatterParameters<typeof positiveIntFormatter>
  | ValueFormatterParameters<typeof quantityFormatter>
  | ValueFormatterParameters<typeof rangeFormatter>
  | ValueFormatterParameters<typeof ratioFormatter>
  | ValueFormatterParameters<typeof referenceFormatter>
  | ValueFormatterParameters<typeof stringFormatter>
  | ValueFormatterParameters<typeof timeFormatter>
  | ValueFormatterParameters<typeof unsignedIntFormatter>
  | ValueFormatterParameters<typeof uriFormatter>
  | ValueFormatterParameters<typeof urlFormatter>
  | ValueFormatterParameters<typeof uuidFormatter>;
