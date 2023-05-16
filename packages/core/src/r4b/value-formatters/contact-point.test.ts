import { ContactPoint, ValueSetExpansionContains } from "../fhir-types.codegen";
import { Formatter } from "../formatters";
import { codeFormatter } from "./code";
import {
  ContactPointFormatterOptions,
  contactPointFormatter,
} from "./contact-point";
import { datetimeFormatter } from "./datetime";
import { periodFormatter } from "./period";

describe("contact-point", () => {
  const formatter = new Formatter()
    .register(contactPointFormatter)
    .register(codeFormatter)
    .register(periodFormatter)
    .register(datetimeFormatter);

  describe("format", () => {
    const contactPoint: ContactPoint = {
      use: "home",
      system: "email",
      value: "jack@example.com",
      rank: 42,
      period: {
        start: "2020-10-11",
      },
    };
    const useValueSetExpansion: ReadonlyArray<ValueSetExpansionContains> = [
      {
        code: "home",
        display: "domicile",
      },
    ];
    const systemValueSetExpansion: ReadonlyArray<ValueSetExpansionContains> = [
      {
        code: "email",
        display: "adresse mail",
      },
    ];

    it.each(<
      Array<
        [
          ContactPoint | undefined,
          ContactPointFormatterOptions | undefined,
          string
        ]
      >
    >[
      [contactPoint, undefined, "jack@example.com"],
      [
        contactPoint,
        {
          style: "full",
          useExpansions: useValueSetExpansion,
          systemExpansions: systemValueSetExpansion,
        },
        "42 - 10/11/2020 - ongoing, adresse mail: jack@example.com (domicile)",
      ],
      ...Object.entries({
        full: "42 - 10/11/2020 - ongoing, email: jack@example.com (home)",
        long: "email: jack@example.com (home)",
        medium: "jack@example.com (home)",
        short: "jack@example.com",
      }).map(([style, expected]) => [contactPoint, { style }, expected]),
    ])("format %p %p => %p", (value, options, expected) => {
      expect(formatter.format("ContactPoint", value, options)).toEqual(
        expected
      );
    });

    it("allows to specify line separator", () => {
      expect(
        formatter.format("ContactPoint", contactPoint, {
          style: "full",
          lineSeparator: "\n",
        })
      ).toEqual("42 - 10/11/2020 - ongoing\nemail: jack@example.com (home)");
    });
  });

  describe("format for arrays", () => {
    const contactPoints: ContactPoint[] = [
      {
        rank: 2,
        value: "rank 2",
      },
      {
        rank: 4,
        use: "work",
        value: "rank 4, work",
      },
      {
        rank: 0,
        use: "old",
        value: "rank 0, old, 0 is undefined rank",
      },
      {
        rank: 1,
        use: "old",
        value: "rank 1, old",
      },
      {
        use: "work",
        value: "work",
      },
      {
        rank: 10,
        use: "work",
        value: "rank 10, work",
      },
      {
        rank: 4,
        use: "home",
        value: "rank 4, home",
      },
      {
        use: "home",
        value: "home",
      },
    ];

    it("sorts by period and type", () => {
      expect(formatter.format("ContactPoint", contactPoints)).toEqual(
        "rank 1, old, " +
          "rank 2, " +
          "rank 4, home, " +
          "rank 4, work, " +
          "rank 10, work, " +
          "home, " +
          "work, and " +
          "rank 0, old, 0 is undefined rank"
      );
    });

    it("Allows custom sort and filter", () => {
      expect(
        formatter.format("ContactPoint", contactPoints, {
          useFilterOrder: ["work", "home"],
        })
      ).toEqual(
        "rank 4, work, " +
          "rank 4, home, " +
          "rank 10, work, " +
          "work, and " +
          "home"
      );
    });

    it("Allows to only display a few", () => {
      expect(
        formatter.format("ContactPoint", contactPoints, {
          useFilterOrder: ["work", "home"],
          max: 2,
        })
      ).toEqual("rank 4, work and rank 4, home");
    });
  });
});
