import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { databases } from "@/db/schema";
import { User } from 'next-auth';

interface DatabaseUser extends User {
  id: string;
  email_verified?: Date;
  created_at?: Date;
  updated_at?: Date;
}

interface ExtendedUser extends User {
  emailVerified?: Date | null;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const extendedUser = user as ExtendedUser;
        // Store user data
        await new Promise<void>((resolve, reject) => {
          databases.users.update(
            { email: user.email },
            {
              $set: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                email_verified: extendedUser.emailVerified,
                updated_at: new Date()
              }
            },
            { upsert: true },
            (err: Error | null) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });

        // Store account data
        if (account) {
          await new Promise<void>((resolve, reject) => {
            databases.accounts.update(
              { provider_account_id: account.providerAccountId },
              {
                $set: {
                  id: account.id || `${account.provider}_${account.providerAccountId}`,
                  user_id: user.id,
                  type: account.type,
                  provider: account.provider,
                  provider_account_id: account.providerAccountId,
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  updated_at: new Date()
                }
              },
              { upsert: true },
              (err: Error | null) => {
                if (err) reject(err);
                else resolve();
              }
            );
          });
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session, user }) {
      try {
        // Get user from database
        const dbUser = await new Promise<DatabaseUser | null>((resolve, reject) => {
          databases.users.findOne({ email: session.user?.email }, (err: Error | null, doc: DatabaseUser | null) => {
            if (err) reject(err);
            else resolve(doc);
          });
        });

        if (dbUser && session.user) {
          session.user.id = dbUser.id;
        }

        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.vastwhite.com' : undefined
      }
    }
  }
});

export { handler as GET, handler as POST }; 