'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { UserRole, hasRole } from '@/lib/roleUtils'

interface RoleGuardProps {
  requiredRoles: UserRole | UserRole[]
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
}

/**
 * RoleGuard Component
 * Protects routes and features based on user role
 * 
 * Usage:
 * <RoleGuard requiredRoles="ADMIN">
 *   <AdminPanel />
 * </RoleGuard>
 */
export default function RoleGuard({
  requiredRoles,
  children,
  fallback = null,
  redirectTo,
}: RoleGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // If not authenticated, don't show anything
    if (status === 'unauthenticated') {
      if (redirectTo) {
        router.push(redirectTo)
      }
      return
    }

    // Check if user has required role
    if (status === 'authenticated' && !hasRole(session?.user?.userType, requiredRoles)) {
      if (redirectTo) {
        router.push(redirectTo)
      }
    }
  }, [status, session, requiredRoles, redirectTo, router])

  // Still loading
  if (status === 'loading') {
    return <div className="flex items-center justify-center py-20">Loading...</div>
  }

  // Not authenticated
  if (status === 'unauthenticated') {
    return fallback
  }

  // Check role
  if (!hasRole(session?.user?.userType, requiredRoles)) {
    return fallback
  }

  // User has access
  return <>{children}</>
}
