# Role-Based Access Control (RBAC) Implementation Guide

## Overview

This document describes the role-based access control system implemented for the RES (Roomza's Educated Secret) platform.

## User Roles

The system supports three user roles:

### 1. **ADMIN**
- Full access to admin dashboard
- Can manage contestants, votes, students, sponsors
- Can view all analytics and reports
- Default redirect: `/admin/dashboard`

### 2. **STUDENT**
- Access to main dashboard
- Can vote and see leaderboard
- Can apply for contests
- Can edit profile
- Cannot access admin panel
- Default redirect: `/dashboard`

### 3. **PUBLIC**
- Access to main dashboard (limited features)
- Can vote and see leaderboard
- Can edit profile
- Cannot apply for contests
- Cannot access admin panel
- Default redirect: `/dashboard`

## Implementation Components

### 1. Role Utilities (`src/lib/roleUtils.ts`)

Helper functions for role checking:

```typescript
import { 
  hasRole,
  isAdmin,
  isStudent,
  isPublic,
  canAccessRoute,
  getAllowedRoutes,
  getDefaultRedirectPath
} from '@/lib/roleUtils'

// Check if user has a specific role
hasRole(userRole, 'ADMIN') // true/false
hasRole(userRole, ['STUDENT', 'PUBLIC']) // true/false

// Specific role checks
isAdmin(userRole) // true/false
isStudent(userRole) // true/false
isPublic(userRole) // true/false

// Route access
canAccessRoute(userRole, '/admin/dashboard') // true/false
getAllowedRoutes(userRole) // string[]
getDefaultRedirectPath(userRole) // string
```

### 2. RoleGuard Component (`src/components/auth/RoleGuard.tsx`)

Protects routes and blocks unauthorized access with optional redirect:

```tsx
import RoleGuard from '@/components/auth/RoleGuard'

// Basic usage
<RoleGuard requiredRoles="ADMIN">
  <AdminPanel />
</RoleGuard>

// Multiple roles
<RoleGuard requiredRoles={['STUDENT', 'ADMIN']}>
  <FeaturePanel />
</RoleGuard>

// With redirect
<RoleGuard 
  requiredRoles="ADMIN" 
  redirectTo="/auth/login"
>
  <AdminPanel />
</RoleGuard>

// With fallback UI
<RoleGuard 
  requiredRoles="ADMIN"
  fallback={<div>Access Denied</div>}
>
  <AdminPanel />
</RoleGuard>
```

### 3. FeatureGate Component (`src/components/auth/FeatureGate.tsx`)

Hides features without redirecting:

```tsx
import FeatureGate from '@/components/auth/FeatureGate'

// Hide/show feature based on role
<FeatureGate requiredRoles={['STUDENT', 'ADMIN']}>
  <ApplyButton />
</FeatureGate>

// With fallback
<FeatureGate 
  requiredRoles="ADMIN"
  fallback={<p>This feature is for admins only</p>}
>
  <AdminFeature />
</FeatureGate>
```

### 4. useUserRole Hook (`src/hooks/useUserRole.ts`)

Easy access to role information in components:

```tsx
import { useUserRole } from '@/hooks/useUserRole'

export default function MyComponent() {
  const { userRole, isAdmin, isStudent, hasRole, canAccessRoute } = useUserRole()
  
  if (isAdmin) {
    return <AdminPanel />
  }
  
  if (hasRole(['STUDENT', 'ADMIN'])) {
    return <StudentFeature />
  }
  
  return <PublicFeature />
}
```

### 5. Middleware Protection (`middleware.ts`)

Server-side route protection:

- `/admin/*` - Only accessible by ADMIN users
- `/apply/*` - Only accessible by STUDENT users
- Non-matching routes - Redirects to home or login

## Protected Routes

### Admin Routes
- `/admin/dashboard` - ADMIN only
- `/admin/dashboard/contestants` - ADMIN only
- `/admin/dashboard/votes` - ADMIN only
- `/admin/dashboard/students` - ADMIN only
- `/admin/dashboard/sponsors` - ADMIN only

### Student Routes
- `/apply` - STUDENT only

### Authenticated Routes (Both Student & Public)
- `/dashboard` - STUDENT, PUBLIC
- `/dashboard/profile` - STUDENT, PUBLIC
- `/vote` - STUDENT, PUBLIC
- `/leaderboard` - STUDENT, PUBLIC

## Login and Redirect Flow

1. User logs in via `/auth/login`
2. Credentials validated
3. NextAuth session created with `userType`
4. `useEffect` in login page detects session
5. User redirected to appropriate dashboard based on role:
   - ADMIN → `/admin/dashboard`
   - STUDENT → `/dashboard`
   - PUBLIC → `/dashboard`

## Implementation Examples

### Example 1: Protecting an Admin-Only Page

```tsx
// src/app/admin/settings/page.tsx
'use client'

import RoleGuard from '@/components/auth/RoleGuard'

function SettingsContent() {
  return <div>Admin Settings</div>
}

export default function SettingsPage() {
  return (
    <RoleGuard 
      requiredRoles="ADMIN"
      redirectTo="/auth/login"
    >
      <SettingsContent />
    </RoleGuard>
  )
}
```

### Example 2: Conditional Feature Display

```tsx
// src/components/UserMenu.tsx
'use client'

import FeatureGate from '@/components/auth/FeatureGate'
import { useUserRole } from '@/hooks/useUserRole'

export default function UserMenu() {
  const { userRole } = useUserRole()
  
  return (
    <menu>
      <FeatureGate requiredRoles={['STUDENT', 'ADMIN']}>
        <MenuItem href="/apply">Apply for Contest</MenuItem>
      </FeatureGate>
      
      <FeatureGate requiredRoles="ADMIN">
        <MenuItem href="/admin/dashboard">Admin Panel</MenuItem>
      </FeatureGate>
    </menu>
  )
}
```

### Example 3: Using useUserRole Hook

```tsx
'use client'

import { useUserRole } from '@/hooks/useUserRole'

export default function Dashboard() {
  const { isAdmin, isStudent, userRole } = useUserRole()
  
  return (
    <div>
      <p>Your role: {userRole}</p>
      
      {isAdmin && <AdminPanel />}
      {isStudent && <StudentDashboard />}
      {!isAdmin && !isStudent && <PublicDashboard />}
    </div>
  )
}
```

## Best Practices

1. **Use RoleGuard for entire pages** - Wrap page exports with RoleGuard
2. **Use FeatureGate for UI elements** - Hide/show individual features
3. **Use useUserRole hook** - For conditional rendering within components
4. **Always provide fallback** - Show meaningful message when access denied
5. **Server-side validation** - Middleware provides first line of defense
6. **Client-side guards** - RoleGuard provides second line of defense
7. **API route protection** - Always check user role in API handlers

## Security Considerations

- Middleware protects routes at server level
- RoleGuard components provide client-side protection
- Always validate user role in API endpoints
- Session userType is stored in NextAuth token
- Token is verified before checking role
- Expired sessions redirect to login

## Testing

Test role access:

```typescript
// Test ADMIN access
1. Login as ADMIN user
2. Verify access to /admin/dashboard
3. Verify redirect to /admin/dashboard on login
4. Verify students/public cannot access admin routes

// Test STUDENT access
1. Login as STUDENT user
2. Verify access to /dashboard and /apply
3. Verify redirect to /dashboard on login
4. Verify cannot access /admin routes

// Test PUBLIC access
1. Login as PUBLIC user
2. Verify access to /dashboard (without /apply)
3. Verify redirect to /dashboard on login
4. Verify cannot access /apply or /admin routes
```

## Troubleshooting

### Users redirected to login unexpectedly
- Check NextAuth secret in `.env.local`
- Verify userType is in session/token
- Check middleware config in `middleware.ts`

### RoleGuard showing fallback unexpectedly
- Check session status (loading vs authenticated)
- Verify userType value matches role names (ADMIN, STUDENT, PUBLIC)
- Check browser console for errors

### Routes accessible without proper role
- Verify middleware is configured for that route
- Check RoleGuard is wrapping the page component
- Verify API endpoints validate user role
