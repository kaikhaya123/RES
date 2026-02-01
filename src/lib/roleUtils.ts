/**
 * Role-based access control utilities
 */

export type UserRole = 'STUDENT' | 'PUBLIC' | 'ADMIN';

export const ROLE_HIERARCHY = {
  STUDENT: 1,
  PUBLIC: 1,
  ADMIN: 3,
};

/**
 * Check if user has required role
 */
export function hasRole(userRole: string | undefined, requiredRole: UserRole | UserRole[]): boolean {
  if (!userRole) return false;
  
  const required = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return required.includes(userRole as UserRole);
}

/**
 * Check if user has admin role
 */
export function isAdmin(userRole: string | undefined): boolean {
  return userRole === 'ADMIN';
}

/**
 * Check if user is student
 */
export function isStudent(userRole: string | undefined): boolean {
  return userRole === 'STUDENT';
}

/**
 * Check if user is public
 */
export function isPublic(userRole: string | undefined): boolean {
  return userRole === 'PUBLIC';
}

/**
 * Get allowed routes based on role
 */
export function getAllowedRoutes(role: UserRole | undefined): string[] {
  if (!role) return [];

  const baseRoutes = ['/'];
  const publicRoutes = ['/vote', '/leaderboard', '/contestants', '/contact', '/about', '/how-it-works'];

  switch (role) {
    case 'ADMIN':
      return [
        ...baseRoutes,
        ...publicRoutes,
        '/admin/dashboard',
        '/admin/dashboard/contestants',
        '/admin/dashboard/votes',
        '/admin/dashboard/students',
        '/admin/dashboard/sponsors',
      ];
    case 'STUDENT':
      return [
        ...baseRoutes,
        ...publicRoutes,
        '/dashboard',
        '/dashboard/profile',
        '/apply',
      ];
    case 'PUBLIC':
      return [...baseRoutes, ...publicRoutes, '/dashboard', '/dashboard/profile'];
    default:
      return baseRoutes;
  }
}

/**
 * Get redirect path based on role after login
 */
export function getDefaultRedirectPath(role: UserRole | undefined): string {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard';
    case 'STUDENT':
      return '/dashboard';
    case 'PUBLIC':
      return '/dashboard';
    default:
      return '/';
  }
}

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(role: UserRole | undefined, route: string): boolean {
  const allowedRoutes = getAllowedRoutes(role);
  
  // Check exact match first
  if (allowedRoutes.includes(route)) return true;
  
  // Check if route starts with any allowed route (for nested routes)
  return allowedRoutes.some(allowed => route.startsWith(allowed + '/'));
}
