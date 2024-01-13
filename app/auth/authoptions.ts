import { PrismaAdapter } from "@next-auth/prisma-adapter";

import type { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google";
import prisma from "@/prisma/client";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // Github({
    //   clientId:process.env.GITHUB_CLIENT_ID!,
    //   clientSecret:process.env.GITHUB_CLIENT_SECRET!,
    // })
  ],
  
};
export default authOptions;
