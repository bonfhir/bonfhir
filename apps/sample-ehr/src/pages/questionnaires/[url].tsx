import { MainPage } from "@/components";
import { QuestionnaireResponse } from "@bonfhir/core/r4b";
import { FhirQuestionnaire } from "@bonfhir/react/r4b";
import { CodeHighlight } from "@mantine/code-highlight";
import { Paper, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";

export default function QuestionnairePage() {
  const router = useRouter();
  const { url } = router.query as { url: string | undefined };
  const [questionnaireResponse, setQuestionnaireResponse] = useState<
    QuestionnaireResponse | undefined
  >(undefined);

  return (
    <MainPage>
      <Paper>
        <Stack>
          <FhirQuestionnaire
            source={url}
            onSubmit={setQuestionnaireResponse}
            onCancel={() => router.push("/")}
            rendererProps={{ mainStack: { w: "50%" } }}
          />
          <CodeHighlight
            language="json"
            code={JSON.stringify(questionnaireResponse, undefined, 2) || ""}
          />
        </Stack>
      </Paper>
    </MainPage>
  );
}
