import { Practitioner, Reference, RelatedPerson } from "@bonfhir/core/r4b";
import "next-auth";

declare module "next-auth" {
  interface Account {
    profile: {
      reference: string;
      display: string;
    };
  }

  interface Session {
    user: {
      id: string;
      profile: Reference<Practitioner | RelatedPerson>;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    profile: {
      reference: string;
      display: string;
    };
  }
}
