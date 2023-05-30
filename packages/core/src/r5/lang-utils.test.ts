import { asArray, truncate } from "./lang-utils.js";

describe("lang-utils", () => {
  describe("asArray", () => {
    it("should return an array if the value is not an array", () => {
      expect(asArray("test")).toEqual(["test"]);
    });

    it("should return an array if the value is an array", () => {
      expect(asArray(["test"])).toEqual(["test"]);
    });
  });

  describe("truncate", () => {
    it.each`
      value                    | options                                      | expected
      ${""}                    | ${undefined}                                 | ${""}
      ${undefined}             | ${undefined}                                 | ${undefined}
      ${"Hello world"}         | ${{ length: 5, suffix: "" }}                 | ${"Hello"}
      ${"Hello, world"}        | ${{ length: 5, suffix: "", separator: "," }} | ${"Hello"}
      ${"Hello, world, again"} | ${{ length: 10, separator: /,\s/ }}          | ${"Hello, world..."}
      ${"Hello, world"}        | ${{ length: 20, suffix: "" }}                | ${"Hello, world"}
      ${"Hello, world"}        | ${{ length: 20, suffix: "..." }}             | ${"Hello, world"}
    `(
      "returns $expected when given value=$value, length=$length, omission=$omission, and separator=$separator",
      ({ value, options, expected }) => {
        expect(truncate(value, options)).toEqual(expected);
      }
    );
  });
});
