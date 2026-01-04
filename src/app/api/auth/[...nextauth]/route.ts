import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  // debug: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  events: {
    createUser: async (message) => {
    },
    linkAccount: async (message) => {
    },
    signIn: async (message) => {
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
