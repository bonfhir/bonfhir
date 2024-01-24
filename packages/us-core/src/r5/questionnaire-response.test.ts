import { extendResource } from "@bonfhir/core/r5";
import { usCoreQuestionnaireResponse } from "./questionnaire-response";

describe("questionnaire-response", () => {
  const USCoreQuestionnaireResponse = extendResource("QuestionnaireResponse", {
    ...usCoreQuestionnaireResponse(),
  });

  it("should work", () => {
    const questionnaireResponse = new USCoreQuestionnaireResponse();
    questionnaireResponse.questionnaireUri = "http://example.com";
    expect(questionnaireResponse.questionnaireUri).toBe("http://example.com");

    expect(JSON.stringify(questionnaireResponse)).toMatchSnapshot();

    questionnaireResponse.questionnaireUri = undefined;
    expect(questionnaireResponse.questionnaireUri).toBeUndefined();

    expect(JSON.stringify(questionnaireResponse)).toMatchSnapshot();
  });
});
