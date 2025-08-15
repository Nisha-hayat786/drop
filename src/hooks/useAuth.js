import { useSelector, useDispatch, useMemo } from 'react-redux';
import {
  selectAuth,
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectRole,
  selectIsLoading,
  selectError,
  selectIsSuperAdmin,
  selectIsVenue,
  loginUser,
  logoutUser,
  clearError,
  checkAuthStatus,
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  // Selectors
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isSuperAdmin = useSelector(selectIsSuperAdmin);
  const isVenue = useSelector(selectIsVenue);

  // Memoize actions to prevent unnecessary re-renders
  const actions = useMemo(() => ({
    login: (credentials) => dispatch(loginUser(credentials)),
    logout: () => dispatch(logoutUser()),
    clearAuthError: () => dispatch(clearError()),
    checkAuth: () => dispatch(checkAuthStatus()),
  }), [dispatch]);

  // Memoize the return object to prevent unnecessary re-renders
  const authData = useMemo(() => ({
    // State
    auth,
    user,
    token,
    isAuthenticated,
    role,
    isLoading,
    error,
    isSuperAdmin,
    isVenue,
    
    // Actions
    ...actions,
  }), [
    auth, user, token, isAuthenticated, role, isLoading, error, 
    isSuperAdmin, isVenue, actions
  ]);

  return authData;
};
