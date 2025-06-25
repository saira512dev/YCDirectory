import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      account,
      profile: { id, login, bio },
    }) {
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id,
      });
      if (!existingUser) {
        await client.create({
          _type: "author",
          name,
          id,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

        if (user) {
          token.id = user?._id;
          token.name = user?.name,
          token.email = user?.email
        }
      }
      return token;

    },
      async session({ session, token }) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        return session;
      }
      
    }
  })
