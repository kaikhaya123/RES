import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { studentRegistrationSchema, publicRegistrationSchema } from '@/lib/validations';
import { generateRandomString } from '@/lib/utils';
import { logger } from '@/lib/logger';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, ...data } = body;

    logger.debug('Registration', 'Received payload', { role, userType: data.userType, email: data.email });

    // Validate based on role
    let validatedData;
    if (role === 'admin') {
      // Accept any email, password, first name, and last name for admin registration
      const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
      validatedData = {
        email: data.email ?? '',
        password: data.password ?? '',
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        userType: 'ADMIN',
        dateOfBirth: data.dateOfBirth ?? today,
        province: data.province ?? 'GAUTENG',
        homeAddress: data.homeAddress ?? '',
        phone: data.phone ?? '',
      };
    } else {
      // Ensure userType is present for schema validation
      if (!data.userType) {
        return NextResponse.json(
          { error: 'userType is required (STUDENT or PUBLIC)' },
          { status: 400 }
        );
      }
      const schema = data.userType === 'STUDENT' ? studentRegistrationSchema : publicRegistrationSchema;
      validatedData = schema.parse(data);
    }

    // Check if user or admin already exists
    const { data: existingUser, error: existingError } = await supabase
      .from('User')
      .select('id')
      .eq('email', validatedData.email)
      .maybeSingle();

    if (existingError && existingError.code !== 'PGRST116') {
      // PGRST116 = no rows found for single
      logger.error('Registration', 'Lookup failed', { message: existingError.message, code: existingError.code });
      return NextResponse.json(
        { error: 'Unable to check existing user' },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user or admin
    let user;
    try {
      const createData: any = {
        id: randomUUID(),
        email: validatedData.email,
        password: hashedPassword,
        userType: (validatedData as any).userType ?? 'PUBLIC',
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        dateOfBirth: validatedData.dateOfBirth,
        province: validatedData.province,
        homeAddress: validatedData.homeAddress,
      };

      // Add optional fields only if they exist in validatedData
      const optionalFields = ['municipality', 'town', 'institution', 'campus', 'residence'];
      for (const field of optionalFields) {
        if (field in validatedData && (validatedData as any)[field]) {
          createData[field] = (validatedData as any)[field];
        }
      }

      const { data: inserted, error: insertError } = await supabase
        .from('User')
        .insert(createData)
        .select('id,email,firstName')
        .single();

      if (insertError) {
        logger.error('Registration', 'Database error', { message: insertError.message, code: insertError.code });
        return NextResponse.json(
          { error: 'Failed to create account', details: insertError.message },
          { status: 400 }
        );
      }

      user = inserted;
      logger.info('Registration', 'User created successfully', { userId: user.id, email: user.email });
    } catch (err: any) {
      logger.error('Registration', 'Database error', { message: err.message, code: err.code });
      return NextResponse.json(
        { error: 'Failed to create account', details: err.message },
        { status: 400 }
      );
    }

    // Send verification email (skip for admin)
    if (role !== 'admin') {
      try {
        const { sendVerificationEmail } = await import('@/lib/email');
        await sendVerificationEmail(user.email, user.firstName);
      } catch (emailError) {
        logger.warn('Registration', 'Failed to send verification email', { email: user.email });
        // Don't fail registration if email fails
      }
    }

    const response = {
      message: 'Registration successful! Please check your email to verify your account.',
      userId: user.id,
    };
    logger.info('Registration', 'Response sent', { userId: user.id });
    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    logger.error('Registration', 'Unhandled error', { message: error.message, name: error.name });
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
