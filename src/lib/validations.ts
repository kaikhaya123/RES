import { z } from 'zod';

export const studentRegistrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(0[0-9]{9}|\+27[0-9]{9})$/, 'Invalid South African phone number'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18 && age <= 35;
  }, 'You must be between 18 and 35 years old'),
  
  // Location
  province: z.enum([
    'EASTERN_CAPE',
    'FREE_STATE',
    'GAUTENG',
    'KWAZULU_NATAL',
    'LIMPOPO',
    'MPUMALANGA',
    'NORTHERN_CAPE',
    'NORTH_WEST',
    'WESTERN_CAPE',
  ]),
  homeAddress: z.string().min(10, 'Please provide a complete address'),
  
  // Student Information
  institution: z.string().min(2, 'Institution name is required'),
  campus: z.string().min(2, 'Campus name is required'),
  residence: z.string().optional(),
  
  // Account
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  
  // Terms
  acceptTerms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const publicRegistrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(0[0-9]{9}|\+27[0-9]{9})$/, 'Invalid South African phone number'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18;
  }, 'You must be at least 18 years old'),
  
  // Location
  province: z.enum([
    'EASTERN_CAPE',
    'FREE_STATE',
    'GAUTENG',
    'KWAZULU_NATAL',
    'LIMPOPO',
    'MPUMALANGA',
    'NORTHERN_CAPE',
    'NORTH_WEST',
    'WESTERN_CAPE',
  ]),
  municipality: z.string().min(2, 'Municipality is required'),
  town: z.string().min(2, 'Town/Suburb/Township/Village is required'),
  homeAddress: z.string().min(10, 'Please provide a complete address'),
  
  // Account
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  
  // Terms
  acceptTerms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const nominationSchema = z.object({
  nomineeFirstName: z.string().min(2, 'First name is required'),
  nomineeLastName: z.string().min(2, 'Last name is required'),
  nomineeEmail: z.string().email('Invalid email address'),
  nomineePhone: z.string().regex(/^(0[0-9]{9}|\+27[0-9]{9})$/, 'Invalid phone number'),
  nomineeInstitution: z.string().min(2, 'Institution is required'),
  nomineeCampus: z.string().min(2, 'Campus is required'),
  nomineeProvince: z.enum([
    'EASTERN_CAPE',
    'FREE_STATE',
    'GAUTENG',
    'KWAZULU_NATAL',
    'LIMPOPO',
    'MPUMALANGA',
    'NORTHERN_CAPE',
    'NORTH_WEST',
    'WESTERN_CAPE',
  ]),
  reason: z.string().min(50, 'Please provide at least 50 characters explaining why'),
  supportingInfo: z.string().optional(),
});

export const voteSchema = z.object({
  contestantId: z.string(),
  voteCount: z.number().min(1).max(100),
  isPaid: z.boolean().default(false),
});

export type StudentRegistrationInput = z.infer<typeof studentRegistrationSchema>;
export type PublicRegistrationInput = z.infer<typeof publicRegistrationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type NominationInput = z.infer<typeof nominationSchema>;
export type VoteInput = z.infer<typeof voteSchema>;

// Small helper validators used in tests and simple checks
export function validateEmail(email: string) {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

export function validatePassword(password: string) {
  // Simplified: Ensure length and at least one number and one letter
  return typeof password === 'string' && password.length >= 8 && /[0-9]/.test(password) && /[A-Za-z]/.test(password);
}

export function sanitizeInput(input: string) {
  return String(input).trim();
}
