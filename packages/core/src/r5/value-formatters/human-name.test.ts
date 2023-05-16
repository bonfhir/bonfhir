import { HumanName, ValueSetExpansionContains } from "../fhir-types.codegen";
import { Formatter } from "../formatters";
import { codeFormatter } from "./code";
import { HumanNameFormatterOptions, humanNameFormatter } from "./human-name";

describe("human-name", () => {
  const formatter = new Formatter()
    .register(humanNameFormatter)
    .register(codeFormatter);

  describe("format", () => {
    const name = {
      use: "official",
      family: "Bonisseur de la Bath",
      given: ["Hubert", "Léandre"],
      prefix: ["Mr", "Dr"],
      suffix: ["jr"],
    };
    const expansions: ReadonlyArray<ValueSetExpansionContains> = [
      {
        code: "usual",
        display: "courant",
      },
      {
        code: "official",
        display: "officiel",
      },
      {
        code: "nickname",
        display: "surnom",
      },
    ];

    it.each(<
      Array<
        [HumanName | undefined, HumanNameFormatterOptions | undefined, string]
      >
    >[
      [
        {
          ...name,
          text: "Mr Hubert Bonisseur de la Bath",
        },
        undefined,
        "Mr Hubert Bonisseur de la Bath",
      ],
      [name, undefined, "Hubert Bonisseur de la Bath"],
      [
        name,
        {
          style: "full",
          expansions,
        },
        "Mr Dr Bonisseur de la Bath Hubert Léandre jr",
      ],
      [
        name,
        {
          style: "full",
          expansions,
          includeUse: true,
        },
        "Mr Dr Bonisseur de la Bath Hubert Léandre jr (officiel)",
      ],
      ...Object.entries({
        shorter: "Hubert",
        short: "Hubert Bonisseur de la Bath",
        medium: "Mr Dr Bonisseur de la Bath Hubert",
        long: "Mr Dr Bonisseur de la Bath Hubert Léandre",
        full: "Mr Dr Bonisseur de la Bath Hubert Léandre jr",
      }).map(([style, expected]) => [name, { style }, expected]),
    ])("format %p with %p", (value, options, expected) => {
      expect(formatter.format("HumanName", value, options)).toEqual(expected);
    });
  });

  describe("format for arrays", () => {
    const addresses: HumanName[] = [
      {
        use: "usual",
        text: "usual",
      },
      {
        use: "temp",
        text: "temp",
      },
      {
        use: "official",
        text: "official",
      },
      {
        use: "maiden",
        text: "maiden",
      },
    ];

    it("sorts by use", () => {
      expect(formatter.format("HumanName", addresses)).toEqual(
        "usual, " + "official, " + "temp, " + "and maiden"
      );
    });

    it("Allows custom sort and filter", () => {
      expect(
        formatter.format("HumanName", addresses, {
          useFilterOrder: ["temp", "official"],
        })
      ).toEqual("temp and official");
    });

    it("Allows to only display a few", () => {
      expect(
        formatter.format("HumanName", addresses, {
          useFilterOrder: ["temp", "official"],
          max: 1,
        })
      ).toEqual("temp");
    });
  });
});
