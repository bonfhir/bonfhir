/* eslint-disable unicorn/no-null */
import { build } from "./builders";
import { AnyResourceType, Reference, Resource } from "@bonfhir/fhirtypes/r4b";
import {
  asArray,
  asResource,
  choiceOfDataTypes,
  cleanFhirValues,
  compareBy,
  findReference,
  findReferences,
  flattenQuestionnaireItems,
  getQuestionnaireItemByLinkId,
  resourcesAreEqual,
  truncate,
  urlSafeConcat,
} from "./lang-utils";

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
      },
    );
  });

  describe("urlSafeConcat", () => {
    it.each([
      [[], ""],
      [["http://localhost", "fhir/api/"], "http://localhost/fhir/api/"],
      [["http://localhost", "/fhir/api"], "http://localhost/fhir/api"],
      [["http://localhost/", "fhir/api"], "http://localhost/fhir/api"],
      [["http://localhost/", "/fhir/api"], "http://localhost/fhir/api"],
      [["http://localhost/", "/fhir/api/"], "http://localhost/fhir/api/"],
      [
        [new URL("http://localhost/"), undefined, "/fhir/api/"],
        "http://localhost/fhir/api/",
      ],
    ])("%p -> $%p", (urls, expected) => {
      expect(urlSafeConcat(...urls)).toEqual(expected);
    });
  });

  describe("cleanFhirValues", () => {
    it.each([
      [{}, undefined],
      [{ name: "" }, undefined],
      [{ name: "Acme, Inc" }, { name: "Acme, Inc" }],
      [{ name: ["Acme, Inc", ""] }, { name: ["Acme, Inc"] }],
      [
        { name: [{ family: "Doe" }, { given: [] }], birthDate: "2001-01-01" },
        { name: [{ family: "Doe" }], birthDate: "2001-01-01" },
      ],
    ])("%p == %p", (input, expected) => {
      expect(cleanFhirValues(input)).toEqual(expected);
    });
  });

  describe("resourcesAreEqual", () => {
    it.each([
      [build("Patient", { id: "1" }), build("Patient", { id: "2" }), true],
      [
        build("Patient", { id: "1", name: [{ family: "Doe" }] }),
        build("Patient", { id: "2", name: [{ family: "Smith" }] }),
        false,
      ],
      [
        build("Patient", {
          id: "1",
          name: [{ family: "Doe" }],
          birthDate: "2023-01-01",
        }),
        build("Patient", {
          id: "2",
          name: [{ family: "Doe" }],
          birthDate: "2023-01-01",
        }),
        true,
      ],
      [
        build("Patient", {
          id: "1",
          name: [{ family: "Doe" }],
          birthDate: "2023-01-01",
        }),
        build("Patient", {
          birthDate: "2023-01-01",
          name: [{ family: "Doe" }],
          id: "2",
        }),
        true,
      ],
    ] satisfies Array<[Resource, Resource, boolean]>)(
      "%p == %p",
      (a, b, expected) => {
        expect(resourcesAreEqual(a, b)).toEqual(expected);
      },
    );
  });

  describe("asResource", () => {
    it.each([
      ["Patient", undefined, undefined],
      ["Patient", null, undefined],
      ["Patient", {} as Resource, undefined],
      ["Patient", { resourceType: "Appointment" }, undefined],
      ["Patient", { resourceType: "Patient" }, { resourceType: "Patient" }],
    ] satisfies Array<[AnyResourceType, Resource | null | undefined, unknown]>)(
      "%p == %p",
      (type, value, expected) => {
        expect(asResource(type, value)).toEqual(expected);
      },
    );
  });

  describe("findReference", () => {
    it.each([
      ["Patient", undefined, undefined],
      ["Patient", null, undefined],
      ["Patient", [], undefined],
      [
        "Patient",
        [
          { reference: "Appointment/2" },
          { reference: "Patient/1" },
          { reference: "Patient/2" },
        ],
        { reference: "Patient/1" },
      ],
    ] satisfies Array<
      [AnyResourceType, Reference[] | null | undefined, unknown]
    >)("%p == %p", (type, value, expected) => {
      expect(findReference(value, type)).toEqual(expected);
    });
  });

  describe("findReferences", () => {
    it.each([
      ["Patient", undefined, []],
      ["Patient", null, []],
      ["Patient", [], []],
      [
        "Patient",
        [
          { reference: "Appointment/2" },
          { reference: "Patient/1" },
          { reference: "Patient/2" },
        ],
        [{ reference: "Patient/1" }, { reference: "Patient/2" }],
      ],
    ] satisfies Array<
      [AnyResourceType, Reference[] | null | undefined, unknown]
    >)("%p == %p", (type, value, expected) => {
      expect(findReferences(value, type)).toEqual(expected);
    });
  });

  describe("choiceOfDataTypes", () => {
    it("return undefined when no value", () => {
      const condition = build("Condition", {
        clinicalStatus: { text: "unknown" },
        subject: {},
      });

      const result = choiceOfDataTypes(condition, "onset", {});
      expect(result).toBeUndefined();
    });

    it("return undefined when no options", () => {
      const condition = build("Condition", {
        clinicalStatus: { text: "unknown" },
        subject: {},
        onsetDateTime: "2020-01-01",
      });

      const result = choiceOfDataTypes(condition, "onset", {});
      expect(result).toBeUndefined();
    });

    it("return value", () => {
      const condition = build("Condition", {
        clinicalStatus: { text: "unknown" },
        subject: {},
        onsetDateTime: "2020-01-01",
      });

      const result = choiceOfDataTypes(condition, "onset", {
        dateTime: (value: string) => value + "dateTime",
        string: (value: string) => value + "string",
      });
      expect(result).toEqual("2020-01-01dateTime");
    });
  });

  describe("compareBy", () => {
    it("compare ascending", () => {
      const patients = [
        build("Patient", { birthDate: "2000-01-01" }),
        build("Patient", { birthDate: "1985-01-01" }),
        build("Patient", { birthDate: "1950-01-01" }),
      ];

      const result = patients.sort(compareBy("birthDate"));
      expect(result.map((x) => x.birthDate)).toEqual([
        "1950-01-01",
        "1985-01-01",
        "2000-01-01",
      ]);
    });

    it("compare descending", () => {
      const patients = [
        build("Patient", { birthDate: "2000-01-01" }),
        build("Patient", { birthDate: "1985-01-01" }),
        build("Patient", { birthDate: "1950-01-01" }),
      ];

      const result = patients.sort(compareBy("-birthDate"));
      expect(result.map((x) => x.birthDate)).toEqual([
        "2000-01-01",
        "1985-01-01",
        "1950-01-01",
      ]);
    });
  });

  describe("flattenQuestionnaireItems", () => {
    it("should flatten Questionnaire items", () => {
      const questionnaire = {
        resourceType: "Questionnaire",
        url: "https://www.seenhealth.org/fhir/Questionnaire/PHQ-9",
        title: "PATIENT HEALTH QUESTIONNAIRE (PHQ-9)",
        name: "phq-9",
        status: "active",
        subjectType: ["Patient"],
        item: [
          {
            linkId: "instructions",
            type: "display",
            text: "Over the last 2 weeks, how often have you been\nbothered by any of the following problems?",
          },
          {
            linkId: "questions",
            type: "group",
            item: [
              {
                linkId: "q1",
                type: "choice",
                text: "Little interest or pleasure in doing things",
                answerValueSet:
                  "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
                required: true,
                extension: [
                  {
                    url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                    valueString: '{ "mode": "segmented" }',
                  },
                ],
              },
              {
                linkId: "q2",
                type: "choice",
                text: "Feeling down, depressed, or hopeless",
                answerValueSet:
                  "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
                required: true,
                extension: [
                  {
                    url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                    valueString: '{ "mode": "segmented" }',
                  },
                ],
              },
              {
                linkId: "q3",
                type: "choice",
                text: "Trouble falling or staying asleep, or sleeping too much",
                answerValueSet:
                  "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
                required: true,
                extension: [
                  {
                    url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                    valueString: '{ "mode": "segmented" }',
                  },
                ],
              },
              {
                linkId: "q4",
                type: "choice",
                text: "Feeling tired or having little energy",
                answerValueSet:
                  "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
                required: true,
                extension: [
                  {
                    url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                    valueString: '{ "mode": "segmented" }',
                  },
                ],
              },
              {
                linkId: "q5",
                type: "choice",
                text: "Poor appetite or overeating",
                answerValueSet:
                  "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
                required: true,
                extension: [
                  {
                    url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                    valueString: '{ "mode": "segmented" }',
                  },
                ],
              },
              {
                linkId: "q6",
                type: "choice",
                text: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
                answerValueSet:
                  "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
                required: true,
                extension: [
                  {
                    url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                    valueString: '{ "mode": "segmented" }',
                  },
                ],
              },
              {
                linkId: "q7",
                type: "choice",
                text: "Trouble concentrating on things, such as reading the newspaper or watching television",
                answerValueSet:
                  "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
                required: true,
                extension: [
                  {
                    url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                    valueString: '{ "mode": "segmented" }',
                  },
                ],
              },
              {
                linkId: "q8",
                type: "choice",
                text: "Moving or speaking so slowly that other people could have noticed. Or the opposite being so figety or restless that you have been moving around a lot more than usual",
                answerValueSet:
                  "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
                required: true,
                extension: [
                  {
                    url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                    valueString: '{ "mode": "segmented" }',
                  },
                ],
              },
              {
                linkId: "q9",
                type: "choice",
                text: "Thoughts that you would be better off dead, or of hurting yourself",
                answerValueSet:
                  "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
                required: true,
                extension: [
                  {
                    url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                    valueString: '{ "mode": "segmented" }',
                  },
                ],
              },
            ],
          },
          {
            linkId: "scoring",
            type: "group",
            item: [
              {
                linkId: "score",
                type: "integer",
                readOnly: true,
                text: "Total Score:",
                extension: [
                  {
                    url: "https://www.seenhealth.org/fhir/StructureDefinition/Questionnaire-Scoring",
                    valueCode: "SUM",
                  },
                ],
              },
            ],
          },
        ],
      };

      const items = flattenQuestionnaireItems(questionnaire);
      expect(items.length).toEqual(13);
    });

    it("should flatten QuestionnaireResponse items with nested items", () => {
      const questionnaireResponse = {
        questionnaire: "https://www.seenhealth.org/fhir/Questionnaire/PHQ-9",
        status: "completed",
        authored: "2024-03-20T14:01:10.541Z",
        item: [
          {
            linkId: "instructions",
            text: "Over the last 2 weeks, how often have you been\nbothered by any of the following problems?",
          },
          {
            linkId: "questions",
            item: [
              {
                linkId: "q3",
                text: "Trouble falling or staying asleep, or sleeping too much",
                answer: [
                  {
                    valueCoding: {
                      code: "2",
                      system:
                        "https://www.seenhealth.org/fhir/CodeSystem/PHQ-9-Answers",
                      display: "More than half the days",
                      userSelected: true,
                    },
                  },
                ],
              },
              {
                linkId: "q6",
                text: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
                answer: [
                  {
                    valueCoding: {
                      code: "1",
                      system:
                        "https://www.seenhealth.org/fhir/CodeSystem/PHQ-9-Answers",
                      display: "Several days",
                      userSelected: true,
                    },
                  },
                ],
              },
              {
                linkId: "q7",
                text: "Trouble concentrating on things, such as reading the newspaper or watching television",
                answer: [
                  {
                    valueCoding: {
                      code: "3",
                      system:
                        "https://www.seenhealth.org/fhir/CodeSystem/PHQ-9-Answers",
                      display: "Nearly every day",
                      userSelected: true,
                    },
                  },
                ],
              },
              {
                linkId: "q8",
                text: "Moving or speaking so slowly that other people could have noticed. Or the opposite being so figety or restless that you have been moving around a lot more than usual",
                answer: [
                  {
                    valueCoding: {
                      code: "3",
                      system:
                        "https://www.seenhealth.org/fhir/CodeSystem/PHQ-9-Answers",
                      display: "Nearly every day",
                      userSelected: true,
                    },
                  },
                ],
              },
            ],
          },
          {
            linkId: "scoring",
            item: [
              {
                linkId: "score",
                text: "Total Score:",
                answer: [
                  {
                    valueInteger: 9,
                  },
                ],
              },
            ],
          },
        ],
        resourceType: "QuestionnaireResponse",
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><ul><li><span>Authored: </span>3/20/24, 10:01 AM</li><li><span>Questionnaire: </span>https://www.seenhealth.org/fhir/Questionnaire/PHQ-9</li><li><span>Status: </span>completed</li></ul></div>',
        },
      };
      const items = flattenQuestionnaireItems(questionnaireResponse);
      expect(items.length).toEqual(8);
    });
  });

  describe("getQuestionnaireItemByLinkId", () => {
    const questionnaire = {
      resourceType: "Questionnaire",
      url: "https://www.seenhealth.org/fhir/Questionnaire/PHQ-9",
      title: "PATIENT HEALTH QUESTIONNAIRE (PHQ-9)",
      name: "phq-9",
      status: "active",
      subjectType: ["Patient"],
      item: [
        {
          linkId: "instructions",
          type: "display",
          text: "Over the last 2 weeks, how often have you been\nbothered by any of the following problems?",
        },
        {
          linkId: "questions",
          type: "group",
          item: [
            {
              linkId: "q1",
              type: "choice",
              text: "Little interest or pleasure in doing things",
              answerValueSet:
                "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
              required: true,
              extension: [
                {
                  url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                  valueString: '{ "mode": "segmented" }',
                },
              ],
            },
            {
              linkId: "q2",
              type: "choice",
              text: "Feeling down, depressed, or hopeless",
              answerValueSet:
                "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
              required: true,
              extension: [
                {
                  url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                  valueString: '{ "mode": "segmented" }',
                },
              ],
            },
            {
              linkId: "q3",
              type: "choice",
              text: "Trouble falling or staying asleep, or sleeping too much",
              answerValueSet:
                "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
              required: true,
              extension: [
                {
                  url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                  valueString: '{ "mode": "segmented" }',
                },
              ],
            },
            {
              linkId: "q4",
              type: "choice",
              text: "Feeling tired or having little energy",
              answerValueSet:
                "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
              required: true,
              extension: [
                {
                  url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                  valueString: '{ "mode": "segmented" }',
                },
              ],
            },
            {
              linkId: "q5",
              type: "choice",
              text: "Poor appetite or overeating",
              answerValueSet:
                "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
              required: true,
              extension: [
                {
                  url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                  valueString: '{ "mode": "segmented" }',
                },
              ],
            },
            {
              linkId: "q6",
              type: "choice",
              text: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
              answerValueSet:
                "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
              required: true,
              extension: [
                {
                  url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                  valueString: '{ "mode": "segmented" }',
                },
              ],
            },
            {
              linkId: "q7",
              type: "choice",
              text: "Trouble concentrating on things, such as reading the newspaper or watching television",
              answerValueSet:
                "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
              required: true,
              extension: [
                {
                  url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                  valueString: '{ "mode": "segmented" }',
                },
              ],
            },
            {
              linkId: "q8",
              type: "choice",
              text: "Moving or speaking so slowly that other people could have noticed. Or the opposite being so figety or restless that you have been moving around a lot more than usual",
              answerValueSet:
                "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
              required: true,
              extension: [
                {
                  url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                  valueString: '{ "mode": "segmented" }',
                },
              ],
            },
            {
              linkId: "q9",
              type: "choice",
              text: "Thoughts that you would be better off dead, or of hurting yourself",
              answerValueSet:
                "https://www.seenhealth.org/fhir/ValueSet/PHQ-9-Answers",
              required: true,
              extension: [
                {
                  url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                  valueString: '{ "mode": "segmented" }',
                },
              ],
            },
          ],
        },
        {
          linkId: "scoring",
          type: "group",
          item: [
            {
              linkId: "score",
              type: "integer",
              readOnly: true,
              text: "Total Score:",
              extension: [
                {
                  url: "https://www.seenhealth.org/fhir/StructureDefinition/Questionnaire-Scoring",
                  valueCode: "SUM",
                },
              ],
            },
          ],
        },
      ],
    };

    const score = getQuestionnaireItemByLinkId(
      questionnaire,
      "scoring",
      "score",
    );
    expect(score?.linkId).toEqual("score");

    const q2 = getQuestionnaireItemByLinkId(questionnaire, "q2");
    expect(q2).toBeUndefined();

    const questionsQ2 = getQuestionnaireItemByLinkId(
      questionnaire,
      "questions",
      "q2",
    );
    expect(questionsQ2?.linkId).toEqual("q2");
  });
});
