import { Config } from "@/config";
import { useFhirClientQueryContext } from "@bonfhir/query/r4b";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const { data: session, status } = useSession();
  const fhirClientQueryContext = useFhirClientQueryContext(undefined);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      fetch(Config.public.logoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({}),
      });
      fhirClientQueryContext.queryClient.clear();
      signOut({ callbackUrl: "/" });
    } else {
      router.push("/");
    }
  }, [status]);
}
