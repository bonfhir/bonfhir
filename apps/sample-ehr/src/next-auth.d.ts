import "next-auth";

declare module "next-auth" {
  interface Profile {
    id: string;
    fhirUser: string;
  }

  interface Session {
    //user: {} & DefaultSession["user"];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
  }
}
