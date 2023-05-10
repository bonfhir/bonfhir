import { uriFormatter } from "./formatters/uri";

export interface ValueFormatter<TType extends string, TValue, TOptions> {
  type: TType;
  format: (
    value: TValue,
    options: TOptions | null | undefined,
    formatterOptions: FormatterOptions | null | undefined
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

    return valueFormatter.format(value, options, this._options);
  }

  public register<TType extends string, TValue, TOptions>(
    valueFormatter: ValueFormatter<TType, TValue, TOptions>
  ): Formatter & {
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
    return new Formatter(this._options, newFormatters);
  }
}

export const formatter = (options?: FormatterOptions | null | undefined) =>
  new Formatter(options).register(uriFormatter);

export type FormatterType = ReturnType<typeof formatter>;
