import * as valueFormatters from "./value-formatters";

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
  booleanLabels?: valueFormatters.BooleanLabels | null | undefined;

  /**
   * The default labels to use for system values.
   */
  systemsLabels?:
    | valueFormatters.IdentifierFormatterOptions["systemsLabels"]
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
        .register(valueFormatters.addressFormatter)
        .register(valueFormatters.ageFormatter)
        .register(valueFormatters.booleanFormatter)
        .register(valueFormatters.canonicalFormatter)
        .register(valueFormatters.codeFormatter)
        .register(valueFormatters.codeableConceptFormatter)
        .register(valueFormatters.codingFormatter)
        .register(valueFormatters.contactPointFormatter)
        .register(valueFormatters.countFormatter)
        .register(valueFormatters.dateFormatter)
        .register(valueFormatters.dateTimeFormatter)
        .register(valueFormatters.decimalFormatter)
        .register(valueFormatters.distanceFormatter)
        .register(valueFormatters.durationFormatter)
        .register(valueFormatters.fhirPathFormatter)
        .register(valueFormatters.humanNameFormatter)
        .register(valueFormatters.idFormatter)
        .register(valueFormatters.identifierFormatter)
        .register(valueFormatters.instantFormatter)
        .register(valueFormatters.integerFormatter)
        // #if fhir >= r5
        .register(valueFormatters.integer64Formatter)
        // #endif
        .register(valueFormatters.markdownFormatter)
        .register(valueFormatters.moneyFormatter)
        .register(valueFormatters.oidFormatter)
        .register(valueFormatters.periodFormatter)
        .register(valueFormatters.positiveIntFormatter)
        .register(valueFormatters.quantityFormatter)
        .register(valueFormatters.rangeFormatter)
        .register(valueFormatters.ratioFormatter)
        .register(valueFormatters.referenceFormatter)
        .register(valueFormatters.stringFormatter)
        .register(valueFormatters.timeFormatter)
        .register(valueFormatters.unsignedIntFormatter)
        .register(valueFormatters.uriFormatter)
        .register(valueFormatters.urlFormatter)
        .register(valueFormatters.uuidFormatter)
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
  | ValueFormatterParameters<typeof valueFormatters.addressFormatter>
  | ValueFormatterParameters<typeof valueFormatters.ageFormatter>
  | ValueFormatterParameters<typeof valueFormatters.booleanFormatter>
  | ValueFormatterParameters<typeof valueFormatters.canonicalFormatter>
  | ValueFormatterParameters<typeof valueFormatters.codeFormatter>
  | ValueFormatterParameters<typeof valueFormatters.codeableConceptFormatter>
  | ValueFormatterParameters<typeof valueFormatters.codingFormatter>
  | ValueFormatterParameters<typeof valueFormatters.contactPointFormatter>
  | ValueFormatterParameters<typeof valueFormatters.countFormatter>
  | ValueFormatterParameters<typeof valueFormatters.dateFormatter>
  | ValueFormatterParameters<typeof valueFormatters.dateTimeFormatter>
  | ValueFormatterParameters<typeof valueFormatters.decimalFormatter>
  | ValueFormatterParameters<typeof valueFormatters.distanceFormatter>
  | ValueFormatterParameters<typeof valueFormatters.durationFormatter>
  | ValueFormatterParameters<typeof valueFormatters.fhirPathFormatter>
  | ValueFormatterParameters<typeof valueFormatters.humanNameFormatter>
  | ValueFormatterParameters<typeof valueFormatters.idFormatter>
  | ValueFormatterParameters<typeof valueFormatters.identifierFormatter>
  | ValueFormatterParameters<typeof valueFormatters.instantFormatter>
  | ValueFormatterParameters<typeof valueFormatters.integerFormatter>
  // #if fhir >= r5
  | ValueFormatterParameters<typeof valueFormatters.integer64Formatter>
  // #endif
  | ValueFormatterParameters<typeof valueFormatters.markdownFormatter>
  | ValueFormatterParameters<typeof valueFormatters.moneyFormatter>
  | ValueFormatterParameters<typeof valueFormatters.oidFormatter>
  | ValueFormatterParameters<typeof valueFormatters.periodFormatter>
  | ValueFormatterParameters<typeof valueFormatters.positiveIntFormatter>
  | ValueFormatterParameters<typeof valueFormatters.quantityFormatter>
  | ValueFormatterParameters<typeof valueFormatters.rangeFormatter>
  | ValueFormatterParameters<typeof valueFormatters.ratioFormatter>
  | ValueFormatterParameters<typeof valueFormatters.referenceFormatter>
  | ValueFormatterParameters<typeof valueFormatters.stringFormatter>
  | ValueFormatterParameters<typeof valueFormatters.timeFormatter>
  | ValueFormatterParameters<typeof valueFormatters.unsignedIntFormatter>
  | ValueFormatterParameters<typeof valueFormatters.uriFormatter>
  | ValueFormatterParameters<typeof valueFormatters.urlFormatter>
  | ValueFormatterParameters<typeof valueFormatters.uuidFormatter>;
