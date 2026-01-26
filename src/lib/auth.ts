import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "change-this";

export function signAdmin(payload: { id: number; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

// Use JWT strategy for reliability - database adapter can cause fetch errors
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-change-in-production',
  // Enable debug logs in non-production to capture server-side NextAuth errors
  debug: process.env.NODE_ENV !== 'production',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        identifier: { label: 'Email or Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        try {
          // Find user by email or phone via Supabase
          const { data: users, error } = await supabase
            .from('User')
            .select('id, email, password, firstName, lastName, userType, phone')
            .eq('email', credentials.identifier);

          if (error) {
            console.error('Supabase auth lookup error:', error);
            throw new Error('Authentication failed');
          }

          let user = users?.[0];

          // If not found by email, try phone
          if (!user) {
            const { data: phoneUsers, error: phoneError } = await supabase
              .from('User')
              .select('id, email, password, firstName, lastName, userType, phone')
              .eq('phone', credentials.identifier);

            if (phoneError) {
              console.error('Supabase phone lookup error:', phoneError);
              throw new Error('Authentication failed');
            }

            user = phoneUsers?.[0];
          }

          if (!user || !user.password) {
            console.error('User not found or missing password:', { identifier: credentials.identifier });
            throw new Error('Invalid credentials');
          }

          console.log('Attempting password comparison for user:', user.email);
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.error('Password comparison failed for user:', user.email);
            throw new Error('Invalid credentials');
          }

          return {
            id: String(user.id),
            email: user.email || '',
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            userType: user.userType,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.userType = user.userType;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
