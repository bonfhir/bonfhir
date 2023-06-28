import { MainPage } from "@/components";
import { QuestionnaireResponse } from "@bonfhir/core/r4b";
import { FhirQuestionnaire } from "@bonfhir/ui/r4b";
import { Stack } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useRouter } from "next/router";
import { useState } from "react";

export default function QuestionnairePage() {
  const router = useRouter();
  const { url } = router.query as { url: string };
  const [questionnaireResponse, setQuestionnaireResponse] = useState<
    QuestionnaireResponse | undefined
  >(undefined);

  return (
    <MainPage>
      <Stack>
        <FhirQuestionnaire
          source={url}
          onSubmit={setQuestionnaireResponse}
          rendererProps={{ mainStack: { w: "50%" } }}
        />
        <Prism language="json">
          {JSON.stringify(questionnaireResponse, undefined, 2) || ""}
        </Prism>
      </Stack>
    </MainPage>
  );
}
