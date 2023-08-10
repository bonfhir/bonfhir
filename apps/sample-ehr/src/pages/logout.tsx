import { useFhirClientQueryContext } from "@bonfhir/query/r4b";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const { status } = useSession();
  const fhirClientQueryContext = useFhirClientQueryContext(undefined);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      fhirClientQueryContext.queryClient.clear();
      signOut({ callbackUrl: "/" });
    } else {
      router.push("/");
    }
  }, [status]);
}
