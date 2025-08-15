import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from './store';
import { checkAuthStatus } from './store/slices/authSlice';
import Layout from './components/Layout';
import SuperAdminLayout from './components/SuperAdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import Dashboard from './pages/Dashboard';
import SuperAdmin from './pages/SuperAdmin';
import Users from './pages/superadmin/Users';
import Venues from './pages/superadmin/Venues';
import AdminPosts from './pages/superadmin/Posts';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import CheckEmail from './pages/auth/CheckEmail';
import ResetPassword from './pages/auth/ResetPassword';
import ResetSuccess from './pages/auth/ResetSuccess';
import Auth from './pages/auth';
import Posts from './pages/Posts';
import Subscriptions from './pages/Subscriptions';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import UserProfile from './pages/superadmin/UserProfile';
import VenueProfile from './pages/superadmin/VenueProfile';

// Component to handle auth status check
const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes without layout - no authentication required */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/check-email" element={<CheckEmail />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/reset-success" element={<ResetSuccess />} />
      
      {/* Root path - redirect based on role */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <LoadingSpinner />
          </ProtectedRoute>
        } 
      />
      
      {/* SuperAdmin routes - only accessible by admin role */}
      <Route
        path="/superadmin/*"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SuperAdminLayout>
              <Routes>
                <Route path="/" element={<SuperAdmin />} />
                <Route path="/users" element={<Users />} />
                <Route path="/venues" element={<Venues />} />
                <Route path="/posts" element={<AdminPosts />} />
                <Route path="/user/:id" element={<UserProfile />} />
                <Route path="/venue/:id" element={<VenueProfile />} />
              </Routes>
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Main app routes - accessible by venue role */}
      <Route
        path="/*"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings/>} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthChecker>
        <AppRoutes />
      </AuthChecker>
    </Provider>
  );
};

export default App;