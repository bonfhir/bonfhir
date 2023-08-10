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
        };
      },
    },
  ],
  secret: Config.server.authSecret,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token!;
        token.profile = account.profile;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.sub!,
        profile: token.profile,
      };
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      await fetch(Config.server.logoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: JSON.stringify({}),
      });
    },
  },
});
