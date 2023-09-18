import Image from "next/image";
import { ShadcnFhirValue } from "@bonfhir/ui-shadcn/r4b";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ShadcnFhirValue />
    </main>
  );
}
