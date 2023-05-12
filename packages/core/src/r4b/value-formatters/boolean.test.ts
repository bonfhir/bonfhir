import { booleanFormatter } from "./boolean";

describe("booleanFormatter", () => {
  it.each([
    [true, "yes", undefined, {}],
    [false, "no", undefined, {}],
    [undefined, "", undefined, {}],
    [true, "true", { labels: { true: "true" } }, {}],
    // eslint-disable-next-line unicorn/no-null
    [null, "nothing", { labels: { nil: "nothing" } }, {}],
  ])("format %p", (value, expected, options, formatterOptions) => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      booleanFormatter.format(value, options, formatterOptions as any)
    ).toEqual(expected);
  });
});
