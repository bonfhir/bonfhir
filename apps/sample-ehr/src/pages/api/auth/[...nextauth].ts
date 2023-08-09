import { Config } from "@/config";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    {
      id: "medplum",
      name: "Medplum",
      type: "oauth",
      checks: ["state", "nonce"],
      wellKnown: `${Config.server.authServerUrl}/.well-known/openid-configuration`,
      clientId: Config.server.authClientId,
      clientSecret: Config.server.authClientSecret,
      profile: (profile) => {
        return {
          id: profile.sub,
          fhirUser: profile.fhirUser,
        };
      },
    },
  ],
  secret: process.env.AUTH_SECRET || "secret",
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token!;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
