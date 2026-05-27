import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import GoogleProvider from 'next-auth/providers/google';
/*PERSONAL STUDIES APPLYIOONG GOOGLE AUTHENTICATION PROVIDER IN NEXTAUTH.JS*/


 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    console.log('Fetched user:', user);
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
callbacks: {
  async signIn({ user, account }) {

    try {

      if (account?.provider === "google") {

        if (!user.email) {
          return false;
        }

        const email = user.email;
        const name = user.name ?? "";
        const image = user.image ?? "";

        const existingUser = await sql`
          SELECT * FROM users
          WHERE email = ${email}
        `;

        if (existingUser.length === 0) {

          await sql`
            INSERT INTO users (name, email, image)
            VALUES (${name}, ${email}, ${image})
          `;

          console.log("Google user inserted");
        }
      }

      return true;

    } catch (error) {

      console.error("GOOGLE SIGN IN ERROR:", error);

      return false;
    }
  },
},
});