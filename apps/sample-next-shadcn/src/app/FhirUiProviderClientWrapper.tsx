"use client";

import { ShadcnRenderer } from "@bonfhir/shadcn/r4b";
import { FhirUIProvider } from "@bonfhir/react/r4b";
import { Formatter } from "@bonfhir/core/r4b";
import { SystemLabels } from "@/fhir/known-identifiers";
import { ReactNode } from "react";

//TODO: we need to create this wrapper as our package is stripping out our 'use client' when bundling
export const FhirUiProviderClientWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <FhirUIProvider
      renderer={{ ...ShadcnRenderer }}
      formatter={Formatter.build({
        systemsLabels: SystemLabels,
      })}
      onNavigate={({ target, aux }) => {
        // if (aux) {
        //   window.open(target, "_blank");
        // } else {
        //   router.push(target);
        // }
      }}
    >
      {children}
    </FhirUIProvider>
  );
};
