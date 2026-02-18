import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin-token')?.value;
  
  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  return decoded;
}

export function requireAdmin(req: NextRequest) {
  const admin = verifyAdmin(req);
  
  if (!admin) {
    return NextResponse.json(
      { error: 'Admin authentication required' },
      { status: 401 }
    );
  }
  
  return admin;
}