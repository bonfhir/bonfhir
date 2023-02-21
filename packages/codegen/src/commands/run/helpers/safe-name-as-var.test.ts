import { safeNameAsVar } from "./safe-name-as-var";

describe("safeNameAsVar", () => {
  it.each([
    [undefined, undefined],
    ["", ""],
    ["abc", "abc"],
    ["abc%^qwe", "abcqwe"],
    ["a b c", "abc"],
    ["A123b", "A123b"],
    ["123abc456", "OneHundredTwentyThreeabc456"],
  ])("convert as safe variable name", (value, expected) => {
    expect(safeNameAsVar(value)).toEqual(expected);
  });
});
