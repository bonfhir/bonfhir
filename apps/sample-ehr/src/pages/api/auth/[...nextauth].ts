import NextAuth from "next-auth";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      id: "medplum",
      name: "Medplum",
      type: "oauth",
      wellKnown: "http://localhost:8103/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      idToken: true,
      checks: ["state", "nonce"],
      clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
      clientSecret:
        "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
      profile(profile) {
        return {
          id: profile.sub,
          fhirUser: profile.fhirUser,
        };
      },
    },
  ],
  secret: "secret",
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
});
