import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SuperAdminLayout from './components/SuperAdminLayout';
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

const App = () => {
  return (
    <Routes>
      {/* Auth routes without layout */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/check-email" element={<CheckEmail />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/reset-success" element={<ResetSuccess />} />
      
      {/* SuperAdmin routes with SuperAdminLayout */}
      <Route
        path="/superadmin/*"
        element={
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
        }
      />
      
      {/* Main app routes with layout (for venue users) */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings/>} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;