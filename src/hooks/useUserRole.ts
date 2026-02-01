'use client'

import { useSession } from 'next-auth/react'
import { UserRole, hasRole, isAdmin, isStudent, isPublic, canAccessRoute } from '@/lib/roleUtils'

/**
 * Hook to check user role
 * 
 * Usage:
 * const { userRole, isAdmin, isStudent, hasRole } = useUserRole()
 */
export function useUserRole() {
  const { data: session } = useSession()
  const userRole = (session?.user?.userType as UserRole) || undefined

  return {
    userRole,
    isAdmin: isAdmin(userRole),
    isStudent: isStudent(userRole),
    isPublic: isPublic(userRole),
    hasRole: (role: UserRole | UserRole[]) => hasRole(userRole, role),
    canAccessRoute: (route: string) => canAccessRoute(userRole, route),
  }
}
