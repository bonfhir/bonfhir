import { Address, ValueSetExpansionContains } from "../fhir-types.codegen";
import { Formatter } from "../formatters";
import { AddressFormatterOptions, addressFormatter } from "./address";
import { codeFormatter } from "./code";
import { datetimeFormatter } from "./date-time";
import { periodFormatter } from "./period";

describe("address", () => {
  const formatter = new Formatter()
    .register(addressFormatter)
    .register(codeFormatter)
    .register(periodFormatter)
    .register(datetimeFormatter);

  describe("format", () => {
    const address: Address = {
      use: "home",
      type: "postal",
      line: [
        "18 rue des paquerettes",
        "allée 3",
        "batiment 4",
        "appartement 008",
      ],
      city: "Wonderland",
      district: "Baldwin",
      state: "Nevada",
      postalCode: "2A1 J7T",
      country: "US",
      period: {
        start: "2020-10-11",
      },
      text: "18 rue des paquerettes, Nevada. (main address)",
    };
    const useValueSetExpansion: ReadonlyArray<ValueSetExpansionContains> = [
      {
        code: "home",
        display: "domicile",
      },
    ];
    const typeValueSetExpansion: ReadonlyArray<ValueSetExpansionContains> = [
      {
        code: "postal",
        display: "adresse postale",
      },
    ];

    it.each(<
      Array<
        [Address | undefined, AddressFormatterOptions | undefined, string[]]
      >
    >[
      [
        address,
        {
          style: "extended",
          useValueSetExpansions: useValueSetExpansion,
          typeValueSetExpansions: typeValueSetExpansion,
          preferText: false,
        },
        [
          "(10/11/2020 - ongoing)",
          "adresse postale - domicile",
          "18 rue des paquerettes",
          "allée 3",
          "batiment 4",
          "appartement 008",
          "Wonderland, Nevada 2A1 J7T",
        ],
      ],
      [
        address,
        {
          style: "extended",
          preferText: false,
          includeCountry: true,
        },
        [
          "(10/11/2020 - ongoing)",
          "postal - home",
          "18 rue des paquerettes",
          "allée 3",
          "batiment 4",
          "appartement 008",
          "Wonderland, Nevada 2A1 J7T",
          "US",
        ],
      ],
      [
        address,
        {
          style: "extended",
          preferText: true,
        },
        ["18 rue des paquerettes, Nevada. (main address)"],
      ],
      ...Object.entries({
        short: [
          "18 rue des paquerettes",
          "allée 3",
          "batiment 4",
          "appartement 008",
          "Wonderland",
          "Nevada 2A1 J7T",
        ],
        full: [
          "(10/11/2020 - ongoing)",
          "18 rue des paquerettes",
          "allée 3",
          "batiment 4",
          "appartement 008",
          "Wonderland",
          "Nevada 2A1 J7T",
        ],
        extended: [
          "(10/11/2020 - ongoing)",
          "postal - home",
          "18 rue des paquerettes",
          "allée 3",
          "batiment 4",
          "appartement 008",
          "Wonderland, Nevada 2A1 J7T",
        ],
      }).map(([style, expected]) => [
        address,
        { style, preferText: false },
        expected,
      ]),
    ])("format %p %p => %p", (value, options, expected) => {
      expect(formatter.format("Address", value, options)).toEqual(
        expected.join(", ")
      );
    });

    it("allows to specify line separator", () => {
      expect(
        formatter.format("Address", address, {
          preferText: false,
          lineSeparator: "\n ",
        })
      ).toEqual(
        [
          "18 rue des paquerettes",
          "allée 3",
          "batiment 4",
          "appartement 008",
          "Wonderland, Nevada 2A1 J7T",
        ].join("\n ")
      );
    });
  });

  describe("format for arrays", () => {
    const addresses: Address[] = [
      {
        use: "home",
        period: { end: "2023-01-01" },
        text: "home, past",
      },
      {
        use: "work",
        period: { end: "2023-01-01" },
        text: "work, past",
      },
      {
        use: "temp",
        text: "temp, present",
      },
      {
        use: "work",
        text: "work, present",
      },
      {
        use: "old",
        period: { end: "1990-01-01" },
        text: "a long time ago, old",
      },
      {
        period: { end: "1990-01-01" },
        text: "a long time ago, no use",
      },
      {
        use: "work",
        period: { end: "1990-01-01" },
        text: "a long time ago, work",
      },
    ];

    it("sorts by period and type", () => {
      expect(formatter.format("Address", addresses)).toEqual(
        "work, present, " +
          "temp, present, " +
          "home, past, " +
          "work, past, " +
          "a long time ago, work, " +
          "a long time ago, old, and " +
          "a long time ago, no use"
      );
    });

    it("Allows custom sort and filter", () => {
      expect(
        formatter.format("Address", addresses, {
          useFilterOrder: ["work", "home"],
        })
      ).toEqual(
        "work, present, " +
          "work, past, " +
          "home, past, and " +
          "a long time ago, work"
      );
    });

    it("Allows to only display a few", () => {
      expect(
        formatter.format("Address", addresses, {
          useFilterOrder: ["work", "home"],
          max: 2,
        })
      ).toEqual("work, present and work, past");
    });
  });
});
