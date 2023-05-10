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

export interface FormatterOptions {
  locale?: string | null | undefined;
}

export class Formatter {
  constructor(
    private readonly _options?: FormatterOptions | null | undefined,
    private readonly _formatters = new Map<
      string,
      ValueFormatter<string, unknown, unknown>
    >()
  ) {}

  public format(
    type: string,
    value: unknown,
    options?: unknown | null | undefined
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

  public register<TType extends string, TValue, TOptions>(
    valueFormatter: ValueFormatter<TType, TValue, TOptions>
  ): this & {
    format(
      type: TType,
      value: TValue,
      options?: TOptions | null | undefined
    ): string;
  } {
    const newFormatters = new Map(this._formatters);
    newFormatters.set(
      valueFormatter.type,
      valueFormatter as ValueFormatter<string, unknown, unknown>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Formatter(this._options, newFormatters) as any;
  }
}

export const formatter = (options?: FormatterOptions | null | undefined) =>
  new Formatter(options)
    .register(valueFormatters.canonicalFormatter)
    .register(valueFormatters.fhirPathFormatter)
    .register(valueFormatters.idFormatter)
    .register(valueFormatters.oidFormatter)
    .register(valueFormatters.stringFormatter)
    .register(valueFormatters.uriFormatter)
    .register(valueFormatters.urlFormatter)
    .register(valueFormatters.uuidFormatter);

export type FormatterType = ReturnType<typeof formatter>;
