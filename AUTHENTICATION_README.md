# Authentication System Documentation

## Overview
This project implements a complete Redux-based authentication system with role-based access control (RBAC) for the DROP application.

## Features
- ✅ Redux Toolkit state management
- ✅ JWT token authentication
- ✅ Role-based routing (admin/superadmin vs venue)
- ✅ Protected routes
- ✅ Automatic token management
- ✅ Axios interceptors for API calls
- ✅ Persistent authentication state
- ✅ Loading states and error handling

## Architecture

### Redux Store Structure
```
store/
├── index.js          # Main store configuration
└── slices/
    └── authSlice.js  # Authentication state and actions
```

### Components
- `ProtectedRoute` - Route protection based on authentication and roles
- `RoleRedirect` - Automatic redirection based on user role
- `Header` - User info and logout functionality
- `SuperAdminSidebar` - Admin navigation with logout

### Hooks
- `useAuth` - Custom hook for authentication state and actions

## API Integration

### Base URL
- **Production**: `https://api.dropofficial.app/api/v1`
- **Environment Variable**: `VITE_API_BASE_URL`

### Authentication Endpoints
- **Login**: `POST /auth/login`
- **Expected Response**:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "admin" // or "venue"
  }
}
```

## Role-Based Access Control

### Roles
1. **`admin`** (SuperAdmin)
   - Access to `/superadmin/*` routes
   - Cannot access venue dashboard
   - Full administrative privileges

2. **`venue`** (Venue User)
   - Access to venue dashboard routes
   - Cannot access superadmin routes
   - Limited to venue-specific features

### Route Protection
- **Public Routes**: `/auth/*` (login, signup, etc.)
- **Admin Routes**: `/superadmin/*` (protected for admin role only)
- **Venue Routes**: `/dashboard`, `/posts`, etc. (protected for venue role only)

## Usage Examples

### Using the useAuth Hook
```jsx
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { user, isAuthenticated, role, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Role: {role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### Protected Route Implementation
```jsx
import ProtectedRoute from '../components/ProtectedRoute';

// Route accessible only to admin users
<ProtectedRoute allowedRoles={['admin']}>
  <AdminDashboard />
</ProtectedRoute>

// Route accessible only to venue users
<ProtectedRoute allowedRoles={['venue']}>
  <VenueDashboard />
</ProtectedRoute>

// Route accessible to authenticated users of any role
<ProtectedRoute>
  <UserProfile />
</ProtectedRoute>
```

## State Management

### Authentication State
```javascript
{
  user: null | UserObject,
  token: null | string,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: null | string,
  role: null | 'admin' | 'venue'
}
```

### Actions
- `loginUser(credentials)` - Authenticate user
- `logoutUser()` - Clear authentication state
- `checkAuthStatus()` - Verify existing session
- `clearError()` - Clear error messages

## Security Features

### Token Management
- JWT tokens stored in localStorage
- Automatic token inclusion in API requests
- Token expiration handling (401 responses)
- Automatic logout on token invalidation

### Route Protection
- Client-side route protection
- Role-based access control
- Automatic redirection for unauthorized access
- Persistent authentication state

## Error Handling

### Login Errors
- Invalid credentials
- Network errors
- Server errors
- User-friendly error messages

### Authentication Errors
- Token expiration
- Invalid tokens
- Automatic logout and redirect

## Development Notes

### Environment Setup
Create a `.env.local` file:
```env
VITE_API_BASE_URL=https://api.dropofficial.app/api/v1
```

### Testing Authentication
1. Start the development server
2. Navigate to `/auth/login`
3. Use demo credentials:
   - **SuperAdmin**: `admin@drop.com` / any password
   - **Venue**: `venue@drop.com` / any password

### Adding New Protected Routes
1. Wrap the route with `ProtectedRoute`
2. Specify allowed roles if needed
3. Ensure proper navigation structure

## Dependencies
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React Redux bindings
- `axios` - HTTP client with interceptors
- `react-router-dom` - Routing and navigation

## Future Enhancements
- Refresh token implementation
- Remember me functionality
- Multi-factor authentication
- Session timeout warnings
- Audit logging
- Role-based UI components
