import { MainPage } from "@/components";
import { FhirQuestionnaire } from "@bonfhir/ui/r4b";
import { useRouter } from "next/router";

export default function QuestionnairePage() {
  const router = useRouter();
  const { url } = router.query as { url: string };

  return (
    <MainPage>
      <FhirQuestionnaire
        source={url}
        onSubmit={(response) => alert(JSON.stringify(response, undefined, 2))}
        rendererProps={{ mainStack: { w: "50%" } }}
      />
    </MainPage>
  );
}
