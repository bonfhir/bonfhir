import { ValueSetExpansionContains } from "fhir/r4";
import { recursiveFlatten } from "./recursive-flatten";

describe("recursiveFlatten", () => {
  it("recursively flatten", () => {
    const value: ValueSetExpansionContains[] = [
      {
        code: "1",
        contains: [
          {
            code: "11",
          },
          {
            code: "12",
            contains: [
              {
                code: "121",
              },
            ],
          },
        ],
      },
      {
        code: "2",
      },
    ];

    const result = recursiveFlatten(value, "contains");

    expect(result.map((x) => x.code)).toEqual(["1", "11", "12", "121", "2"]);
  });
});
