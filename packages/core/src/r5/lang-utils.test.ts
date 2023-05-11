import { asArray, truncate } from "./lang-utils";

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
      value                    | length | omission | separator | expected
      ${"Hello world"}         | ${5}   | ${""}    | ${""}     | ${"Hello"}
      ${"Hello, world"}        | ${5}   | ${""}    | ${","}    | ${"Hello"}
      ${"Hello, world, again"} | ${10}  | ${"..."} | ${/,\s/}  | ${"Hello, world..."}
      ${"Hello, world"}        | ${20}  | ${""}    | ${""}     | ${"Hello, world"}
      ${"Hello, world"}        | ${20}  | ${"..."} | ${""}     | ${"Hello, world"}
    `(
      "returns $expected when given value=$value, length=$length, omission=$omission, and separator=$separator",
      ({ value, length, omission, separator, expected }) => {
        expect(truncate(value, length, omission, separator)).toEqual(expected);
      }
    );
  });
});
