'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { UserRole, hasRole } from '@/lib/roleUtils'

interface FeatureGateProps {
  requiredRoles: UserRole | UserRole[]
  children: ReactNode
  fallback?: ReactNode
}

/**
 * FeatureGate Component
 * Shows/hides UI features based on user role
 * Unlike RoleGuard, this doesn't redirect - it just hides features
 * 
 * Usage:
 * <FeatureGate requiredRoles={['STUDENT', 'ADMIN']}>
 *   <ExclusiveFeature />
 * </FeatureGate>
 */
export default function FeatureGate({
  requiredRoles,
  children,
  fallback = null,
}: FeatureGateProps) {
  const { data: session, status } = useSession()

  // Still loading
  if (status === 'loading') {
    return null
  }

  // Not authenticated - show nothing
  if (status === 'unauthenticated') {
    return fallback
  }

  // Check role
  if (!hasRole(session?.user?.userType, requiredRoles)) {
    return fallback
  }

  // User has access to feature
  return <>{children}</>
}
