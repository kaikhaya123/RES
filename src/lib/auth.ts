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
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

// Use JWT strategy for reliability - database adapter can cause fetch errors
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-change-in-production',
  // Enable debug logs in non-production to capture server-side NextAuth errors
  debug: false, // Disable debug mode to reduce noise
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Only update session once per day
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user already exists in our database
          const { data: existingUsers, error } = await supabase
            .from('User')
            .select('id, email, firstName, lastName, userType, googleId')
            .eq('email', user.email);

          if (error) {
            console.error('Error checking existing user:', error);
            return false;
          }

          let dbUser = existingUsers?.[0];

          // If user doesn't exist, create a new user
          if (!dbUser) {
            const names = user.name?.split(' ') || [];
            const firstName = names[0] || '';
            const lastName = names.slice(1).join(' ') || '';

            const { data: newUser, error: insertError } = await supabase
              .from('User')
              .insert([
                {
                  email: user.email,
                  firstName,
                  lastName,
                  userType: 'PUBLIC', // default user type from enum
                  googleId: account.providerAccountId,
                  image: user.image,
                  provider: 'google',
                  emailVerified: new Date(),
                }
              ])
              .select('id, email, firstName, lastName, userType, googleId')
              .single();

            if (insertError) {
              console.error('Error creating new user:', insertError);
              return false;
            }

            dbUser = newUser;
          } else if (!dbUser.googleId) {
            // Link existing account with Google
            const { error: updateError } = await supabase
              .from('User')
              .update({
                googleId: account.providerAccountId,
                image: user.image,
                provider: 'google',
                emailVerified: new Date(),
              })
              .eq('id', dbUser.id);

            if (updateError) {
              console.error('Error linking Google account:', updateError);
              return false;
            }
          }

          // Store user info for use in JWT callback
          user.id = String(dbUser.id);
          user.userType = dbUser.userType;
          user.provider = 'google';

          return true;
        } catch (error) {
          console.error('Google sign in error:', error);
          return false;
        }
      }
      
      return true; // Allow other providers
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.userType = user.userType;
        token.image = user.image;
        token.provider = user.provider || account?.provider || 'credentials';
      }
      // Capture Google profile image
      if (account?.provider === 'google' && profile?.image) {
        token.image = profile.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.userType = token.userType as string;
        session.user.image = token.image as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
};
