import { Identifier, ValueSetExpansionContains } from "../fhir-types.codegen";
import { Formatter } from "../formatters";
import { codeFormatter } from "./code";
import { codeableConceptFormatter } from "./codeable-concept";
import { codingFormatter } from "./coding";
import { dateTimeFormatter } from "./date-time";
import { IdentifierFormatterOptions, identifierFormatter } from "./identifier";
import { periodFormatter } from "./period";

describe("identifier", () => {
  const formatter = new Formatter()
    .register(identifierFormatter)
    .register(codeFormatter)
    .register(codingFormatter)
    .register(codeableConceptFormatter)
    .register(periodFormatter)
    .register(dateTimeFormatter);

  describe("format", () => {
    const expansions: ReadonlyArray<ValueSetExpansionContains> = [
      {
        code: "0",
        display: "cat",
      },
      {
        code: "1",
        display: "dog",
      },
      {
        code: "2",
        display: "spider",
      },
    ];
    const coding = {
      coding: [{ code: "0" }, { code: "1" }, { code: "2" }],
      text: "list of code.",
    };
    const systemsLabels = { NAS: "numero de sécurité social" };
    const identifier = {
      use: "usual",
      system: "NAS",
      type: coding,
      value: "123:456:789",
      period: {
        start: "2020-10-11",
      },
    };
    it.each(<
      Array<
        [Identifier | undefined, IdentifierFormatterOptions | undefined, string]
      >
    >[
      [identifier, { pattern: false }, "NAS: 123:456:789"],
      [
        identifier,
        {
          style: "full",
          expansions,
          systemsLabels: systemsLabels,
          pattern: false,
        },
        "[10/11/2020 - ongoing]\nnumero de sécurité social: 123:456:789\nusual - list of code.",
      ],
      ...Object.entries({
        full: "[10/11/2020 - ongoing]\nNAS: 123:456:789\nusual - list of code.",
        long: "NAS: 123:456:789\nusual - list of code.",
        medium: "NAS: 123:456:789 (usual)",
        short: "NAS: 123:456:789",
        value: "123:456:789",
      }).map(([style, expected]) => [
        identifier,
        { style, pattern: false },
        expected,
      ]),
      [
        { system: "http://hl7.org/fhir/sid/us-ssn", value: "123456789" },
        { pattern: false },
        "SSN: 123456789",
      ],
    ])("format %p %p => %p", (value, options, expected) => {
      expect(formatter.format("Identifier", value, options)).toEqual(expected);
    });
  });

  describe("format for arrays", () => {
    const identifiers: Identifier[] = [
      {
        use: "official",
        system: "NAS",
        period: { end: "2023-01-01" },
        value: "official, past",
      },
      {
        use: "usual",
        system: "ID",
        period: { end: "2023-01-01" },
        value: "usual, past",
      },
      {
        use: "temp",
        system: "ID",
        value: "temp, present",
      },
      {
        use: "usual",
        system: "SKD_S",
        value: "usual, present",
      },
      {
        use: "secondary",
        period: { end: "1990-01-01" },
        value: "a long time ago, secondary",
      },
      {
        period: { end: "1990-01-01" },
        value: "a long time ago, no use",
      },
      {
        use: "usual",
        period: { end: "1990-01-01" },
        value: "a long time ago, usual",
      },
    ];

    it("sorts by period and use", () => {
      expect(
        formatter.format("Identifier", identifiers, {
          style: "value",
          pattern: false,
        })
      ).toEqual(
        "usual, present, " +
          "temp, present, " +
          "official, past, " +
          "usual, past, " +
          "a long time ago, usual, " +
          "a long time ago, secondary, " +
          "and a long time ago, no use"
      );
    });

    it("Allows custom sort and filter", () => {
      expect(
        formatter.format("Identifier", identifiers, {
          useFilterOrder: ["official", "usual"],
          style: "value",
          pattern: false,
        })
      ).toEqual(
        "usual, present, " +
          "official, past, " +
          "usual, past, and " +
          "a long time ago, usual"
      );

      expect(
        formatter.format("Identifier", identifiers, {
          systemFilterOrder: ["ID", "NAS"],
        })
      ).toEqual("ID: temp, present, NAS: official, past, and ID: usual, past");
    });

    it("Allows to only display a few", () => {
      expect(
        formatter.format("Identifier", identifiers, {
          useFilterOrder: ["official", "usual"],
          style: "value",
          max: 2,
          pattern: false,
        })
      ).toEqual("usual, present and official, past");
    });
  });

  describe("with a pattern", () => {
    it("formats an identifier with the provided pattern", () => {
      const identifier: Identifier = {
        system: "http://hl7.org/fhir/sid/us-ssn",
        value: "75359831",
      };
      expect(
        formatter.format("Identifier", identifier, {
          pattern: "###-##-####",
          style: "value",
        })
      ).toEqual("753-59-831");
    });

    it("formats an us-mbi identifier with the default us-mbi pattern", () => {
      const identifier: Identifier = {
        system: "http://hl7.org/fhir/sid/us-mbi",
        value: "1EG4TE5MK73",
      };

      expect(
        formatter.format("Identifier", identifier, {
          style: "value",
        })
      ).toEqual("1EG4-TE5-MK73");
    });

    it("formats an identifier with a custom system with a pattern in the record", () => {
      const IdentifierPatterns: Record<string, string> = {
        "http://hl7.org/fhir/sid/us-ssn": "###-#####",
        "http://my-custom-identifier-system": "###-AA-BBB",
        "https://fhir.nhs.uk/Id/nhs-number": "### ### ####",
      };

      const identifier: Identifier = {
        system: "https://fhir.nhs.uk/Id/nhs-number",
        value: "1234567890",
      };

      expect(
        formatter.format("Identifier", identifier, {
          pattern: IdentifierPatterns,
          style: "value",
        })
      ).toEqual("123 456 7890");
    });

    it("returns the original value if a default pattern is not found", () => {
      const identifier: Identifier = {
        system: "fake-system",
        value: "1234567890",
      };
      expect(
        formatter.format("Identifier", identifier, {
          style: "value",
        })
      ).toEqual("1234567890");
    });

    it("returns the original value if a custom pattern is not provided in the mapping", () => {
      const identifier: Identifier = {
        system: "fake-system",
        value: "1234567890",
      };

      const pattern: Record<string, string> = {
        "http://hl7.org/fhir/sid/us-ssn": "###-#####",
        "http://my-custom-identifier-system": "###-AA-BBB",
        "https://fhir.nhs.uk/Id/nhs-number": "### ### ####",
      };
      expect(
        formatter.format("Identifier", identifier, {
          pattern,
          style: "value",
        })
      ).toEqual("1234567890");
    });

    it("returns the original value if the pattern is an empty string", () => {
      const identifier: Identifier = {
        system: "http://hl7.org/fhir/sid/us-ssn",
        value: "75359831",
      };
      expect(
        formatter.format("Identifier", identifier, {
          pattern: "",
          style: "value",
        })
      ).toEqual("75359831");
    });

    it("does nothing if already formatted", () => {
      const identifier: Identifier = {
        system: "http://hl7.org/fhir/sid/us-ssn",
        value: "753-59-831",
      };
      expect(
        formatter.format("Identifier", identifier, {
          style: "value",
        })
      ).toEqual("753-59-831");
    });

    it("formats with the systemPattern overiding the default pattern", () => {
      const identifier: Identifier = {
        system: "http://hl7.org/fhir/sid/us-ssn",
        value: "12345678",
      };
      expect(
        formatter.format("Identifier", identifier, {
          systemsPatterns: { "http://hl7.org/fhir/sid/us-ssn": "### ## ###" },
          style: "value",
        })
      ).toEqual("123 45 678");
    });

    it("formats with escaping the patter characters", () => {
      const identifier: Identifier = {
        system: "http://hl7.org/fhir/sid/us-ssn",
        value: "12345678",
      };
      expect(
        formatter.format("Identifier", identifier, {
          pattern: `###\\##\\####`,
          style: "value",
        })
      ).toEqual("123#45#678");
    });
  });
});
