/* eslint-disable unicorn/no-null */
import {
  extendResource,
  getSetExtension,
  getSetManyExtension,
  getSetTag,
} from "./extensions.js";
import { Coding, DiagnosticReport, Patient } from "./fhir-types.codegen.js";
import { Formatter } from "./formatters.js";

describe("extensions", () => {
  const CustomPatient = extendResource("Patient", {
    computedName(this: Patient): string {
      return (
        Formatter.default.format("HumanName", this.name, { max: 1 }) +
        Formatter.default.format("date", this.birthDate, {
          decorator: " born {}",
        })
      );
    },

    birthSex(this: Patient, value?: string | null | undefined) {
      return getSetExtension(
        this,
        {
          url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
          kind: "valueCode",
        },
        value
      );
    },
  });

  const CustomDiagnosticReport = extendResource("DiagnosticReport", {
    cptCodes(
      this: DiagnosticReport,
      value?: string[] | ((value: string[]) => string[]) | null | undefined
    ) {
      return getSetManyExtension(
        this,
        {
          url: "http://custom/cpt-codes",
          kind: "valueCode",
        },
        value
      );
    },

    visibility(this: DiagnosticReport, value?: Coding | null | undefined) {
      return getSetTag(this, { system: "http://custom/visibility" }, value);
    },

    isPubliclyVisible(): boolean {
      // TODO: See if we can handle this better
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this as any).visibility()?.code === "public";
    },
  });

  it("manage computed properties", () => {
    const patient = new CustomPatient({
      name: [{ given: ["John"], family: "Doe" }],
      birthDate: "1970-01-01",
    });

    expect(patient.resourceType).toBe("Patient");
    expect(patient.computedName()).toBeTruthy();
    expect(JSON.stringify(patient, undefined, 2)).toMatchInlineSnapshot(`
      "{
        "resourceType": "Patient",
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe"
          }
        ],
        "birthDate": "1970-01-01",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Birth Date: </span>1/1/1970</li><li><span>Name: </span><ul><li>John Doe</li></ul></li></ul></div>"
        }
      }"
    `);
  });

  it("manages simple extensions", () => {
    const patient = new CustomPatient();
    expect(patient.birthSex()).toBeUndefined();
    expect(patient.birthSex("OTH")).toEqual("OTH");
    expect(patient.birthSex()).toEqual("OTH");
    expect(JSON.stringify(patient, undefined, 2)).toMatchInlineSnapshot(`
      "{
        "resourceType": "Patient",
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
            "valueCode": "OTH"
          }
        ],
        "text": {
          "status": "generated",
          "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul></ul></div>"
        }
      }"
    `);
    expect(patient.birthSex(null)).toBeUndefined();
    expect(patient.birthSex()).toBeUndefined();
    expect(JSON.stringify(patient, undefined, 2)).toMatchInlineSnapshot(`
      "{
        "resourceType": "Patient",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul></ul></div>"
        }
      }"
    `);
  });

  it("manage array extensions", () => {
    const diagnosticReport = new CustomDiagnosticReport({
      status: "preliminary",
      code: { text: "Diag" },
    });
    expect(diagnosticReport.cptCodes()).toHaveLength(0);
    expect(diagnosticReport.cptCodes(["123"])).toHaveLength(1);
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "extension": [
            {
              "url": "http://custom/cpt-codes",
              "valueCode": "123"
            }
          ],
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
    expect(
      diagnosticReport.cptCodes((values) => [...values, "456"])
    ).toHaveLength(2);
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "extension": [
            {
              "url": "http://custom/cpt-codes",
              "valueCode": "123"
            },
            {
              "url": "http://custom/cpt-codes",
              "valueCode": "456"
            }
          ],
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
    expect(diagnosticReport.cptCodes()).toHaveLength(2);
    expect(diagnosticReport.cptCodes([])).toHaveLength(0);
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
  });

  it("handle tags", () => {
    const diagnosticReport = new CustomDiagnosticReport({
      status: "preliminary",
      code: { text: "Diag" },
    });
    expect(diagnosticReport.visibility()).toBeUndefined();
    expect(diagnosticReport.visibility({ code: "public" })?.code).toEqual(
      "public"
    );
    expect(diagnosticReport.isPubliclyVisible()).toBeTruthy();
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "meta": {
            "tag": [
              {
                "code": "public",
                "system": "http://custom/visibility"
              }
            ]
          },
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
    expect(diagnosticReport.visibility({ code: "internal" })?.code).toEqual(
      "internal"
    );
    expect(diagnosticReport.isPubliclyVisible()).toBeFalsy();
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "meta": {
            "tag": [
              {
                "code": "internal",
                "system": "http://custom/visibility"
              }
            ]
          },
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
    expect(diagnosticReport.visibility(null)).toBeUndefined();
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
  });
});
