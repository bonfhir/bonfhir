import { Formatter } from "./formatters.js";

describe("formatters", () => {
  describe("message", () => {
    it.each([
      [Formatter.default.message``, ""],
      [Formatter.default.message`Hello, ${"world"}!`, "Hello, world!"],
      [
        Formatter.default.message`Hello, ${[
          "HumanName",
          { given: ["John"], family: "Doe" },
        ]}!`,
        "Hello, John Doe!",
      ],
      [Formatter.default.message`${["code", "value"]}`, "value"],
      [
        Formatter.default.message`${["code", "key"]} = ${[
          "CodeableConcept",
          { text: "value" },
        ]}`,
        "key = value",
      ],
    ])("%p => %p", (expression, expected) => {
      expect(expression).toEqual(expected);
    });
  });
});
