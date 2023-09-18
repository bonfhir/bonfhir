import { Textarea } from "@/r5/components/ui/textarea";
import { ReactElement } from "react";

export function ShadcnFhirValue(): ReactElement | null {
  return <Textarea className="px-30" placeholder="Type your message here." />;
}
