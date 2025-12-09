import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { studentRegistrationSchema, publicRegistrationSchema } from '@/lib/validations';
import { generateRandomString } from '@/lib/utils';
import { logger } from '@/lib/logger';

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
    const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });
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
        email: validatedData.email,
        password: hashedPassword,
        userType: (validatedData as any).userType ?? 'PUBLIC',
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        dateOfBirth: new Date(validatedData.dateOfBirth), // Convert string to DateTime
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

      user = await prisma.user.create({ data: createData });
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
