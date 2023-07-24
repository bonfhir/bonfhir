// BonFHIR Playground
//
// You can edit this file in your favorite editor.
// When saved, the watcher pick it up, and automatically executes all the lines below the previous
// end of execution line.
//

// // Import the whole core library
// ERROR: SyntaxError: Unexpected token 'export'
import * as core from "@bonfhir/core/r4b";

// Create a client connected to the local BonFHIR server
const client = new core.FetchFhirClient({
  baseUrl: "http://localhost:8103/fhir/R4/",
  auth: {
    tokenUrl: "http://localhost:8103/oauth2/token",
    clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
    clientSecret:
      "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
  },
});

const patient = core.build("Patient", {
  name: [{ given: ["John"], family: "Doe" }],
  active: true,
});

JSON.stringify(patient, undefined, 2);

patient;


// JSON.stringify(patient, undefined, 2);
// ERROR: SyntaxError: Unexpected token 'export'

// --------- End of execution ---------