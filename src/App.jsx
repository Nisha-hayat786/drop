import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
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

const Placeholder = ({ title }) => (
  <div className="text-3xl text-center mt-24">{title} Page (Coming Soon)</div>
);

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
      {/* Main app routes with layout */}
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