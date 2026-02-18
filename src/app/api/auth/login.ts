import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';
import { signAdmin } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    // Find admin user
    const { data: users, error } = await supabase
      .from('User')
      .select('id, email, password, firstName, lastName, userType')
      .eq('email', email)
      .eq('userType', 'ADMIN')
      .single();

    if (error || !users) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, users.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token for admin
    const token = signAdmin({
      id: parseInt(users.id),
      email: users.email,
    });

    const response = NextResponse.json({
      success: true,
      admin: {
        id: users.id,
        email: users.email,
        name: `${users.firstName} ${users.lastName}`,
      },
    });

    // Set admin token as httpOnly cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
