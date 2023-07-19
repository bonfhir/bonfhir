import { FhirJSONPatchBuilder, JSONPatchBody } from "./patch";
import { ResourceJSONPatchBuilder, fhirJSONPatch } from "./patch.codegen";

describe("patch", () => {
  it.each(<
    Array<[FhirJSONPatchBuilder | ResourceJSONPatchBuilder, JSONPatchBody]>
  >[
    [fhirJSONPatch(), []],
    [fhirJSONPatch("Patient"), []],
    [
      fhirJSONPatch("Patient").add("/telecom/-", { value: "5145145145" }),
      [{ op: "add", path: "/telecom/-", value: { value: "5145145145" } }],
    ],
    [
      fhirJSONPatch("Organization")
        .remove("/telecom/0")
        .replace("/alias/0", "InitRode"),
      [
        { op: "remove", path: "/telecom/0" },
        { op: "replace", path: "/alias/0", value: "InitRode" },
      ],
    ],
  ])("patch %p => %p", (builder, expected) => {
    expect(builder.patch).toEqual(expected);
  });
});
