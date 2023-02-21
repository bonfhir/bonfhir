import { elementImmediatePath } from "./element-immediate-path";

describe("elementImmediatePath", () => {
  it.each([
    [undefined, undefined],
    ["", undefined],
    ["Claim", undefined],
    ["Account.id", "id"],
    ["Patient.contact.name", undefined],
    ["Patient.multipleBirth[x]", undefined],
  ])("extracts immediate path", (path, expected) => {
    expect(elementImmediatePath(path)).toEqual(expected);
  });
});
