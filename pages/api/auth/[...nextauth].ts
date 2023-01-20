import NextAuth, { NextAuthOptions } from "next-auth"
import type { DefaultSession } from "next-auth"
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c"
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
  
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

interface AzureSession extends DefaultSession {
  user?: {
    name?: string
    email?: string
    image?: string
    role?: string
    [key: string]: any
  }
}

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
    AzureADB2CProvider({
      tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET as string,
      primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: { params: { scope: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api/tasks.read https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api/tasks.write offline_access openid` } },
      // checks: ["pkce", "state"],
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
    async session({ session, token }) {
      // console.log('token', token);
      const s = {
        ...session,
        user: {
          ...session.user,
          role: token.userRole,
        },
      };
      return s;
    }
  },
}

export default NextAuth(authOptions)
