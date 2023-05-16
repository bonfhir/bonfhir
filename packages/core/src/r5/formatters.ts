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
export type WithValueFormatter<
  TType,
  TValue,
  TOptions,
  TThis extends Formatter = Formatter
> = {
  format(
    type: TType,
    value: TValue,
    options?: TOptions | null | undefined
  ): string;
} & TThis;

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
}

export class Formatter {
  /** Build a new formatter with the default value formatters registered. */
  public static build(options?: FormatterOptions | null | undefined) {
    return new Formatter(options)
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
      .register(valueFormatters.datetimeFormatter)
      .register(valueFormatters.decimalFormatter)
      .register(valueFormatters.distanceFormatter)
      .register(valueFormatters.durationFormatter)
      .register(valueFormatters.fhirPathFormatter)
      .register(valueFormatters.humanNameFormatter)
      .register(valueFormatters.idFormatter)
      .register(valueFormatters.identifierFormatter)
      .register(valueFormatters.instantFormatter)
      .register(valueFormatters.integerFormatter)
      .register(valueFormatters.oidFormatter)
      .register(valueFormatters.periodFormatter)
      .register(valueFormatters.quantityFormatter)
      .register(valueFormatters.stringFormatter)
      .register(valueFormatters.uriFormatter)
      .register(valueFormatters.urlFormatter)
      .register(valueFormatters.uuidFormatter);
  }

  /**
   * Default instance of the formatter.
   * Use the ambient locale and default options.
   */
  public static default = Formatter.build();

  constructor(
    private readonly _options?: FormatterOptions | null | undefined,
    private readonly _formatters = new Map<
      string,
      ValueFormatter<string, unknown, unknown>
    >()
  ) {}

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
      ...this._options,
    });
  }

  /**
   * Register an additional {@link ValueFormatter} with this formatter.
   */
  public register<TType extends string, TValue, TOptions>(
    valueFormatter: ValueFormatter<TType, TValue, TOptions>
  ): WithValueFormatter<TType, TValue, TOptions, this> {
    const newFormatters = new Map(this._formatters);
    newFormatters.set(
      valueFormatter.type,
      valueFormatter as ValueFormatter<string, unknown, unknown>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Formatter(this._options, newFormatters) as any;
  }
}

/**
 * The standard formatter type - with all the default value formatters registered.
 */
export type StandardFormatter = ReturnType<(typeof Formatter)["build"]>;
