import { extendResource } from "@bonfhir/core/r4b";
import { usCoreQuestionnaireResponse } from "./questionnaire-response";

describe("questionnaire-response", () => {
  const USCoreQuestionnaireResponse = extendResource("QuestionnaireResponse", {
    ...usCoreQuestionnaireResponse(),
  });

  it("should work", () => {
    const questionnaireResponse = new USCoreQuestionnaireResponse();
    questionnaireResponse.questionnaireUri = "http://example.com";
    expect(questionnaireResponse.questionnaireUri).toBe("http://example.com");

    expect(questionnaireResponse).toMatchObject({
      _questionnaire: {
        extension: [
          {
            url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-extension-questionnaire-uri",
            valueUri: "http://example.com",
          },
        ],
      },
      resourceType: "QuestionnaireResponse",
    });

    questionnaireResponse.questionnaireUri = undefined;
    expect(questionnaireResponse.questionnaireUri).toBeUndefined();
    expect(questionnaireResponse._questionnaire).toBeUndefined();
  });
});
