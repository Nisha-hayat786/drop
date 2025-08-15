import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Check if the response has the expected structure
      if (!response.data.data || !response.data.data.user || !response.data.data.token) {
        return rejectWithValue('Invalid response format from server');
      }
      
      // Extract user and token from the nested response structure
      const { user, token } = response.data.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } catch (error) {
      // Handle different types of errors
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.response?.status === 401) {
        return rejectWithValue('Invalid credentials');
      } else if (error.response?.status === 500) {
        return rejectWithValue('Server error. Please try again later.');
      } else if (error.message === 'Network Error') {
        return rejectWithValue('Network error. Please check your connection.');
      } else {
        return rejectWithValue('Login failed. Please try again.');
      }
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
);

// Check if user is already logged in on app start
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (token && user.id) {
        return { token, user };
      }
      throw new Error('No valid session');
    } catch (error) {
      return rejectWithValue('No valid session');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  role: null, // 'admin' (superadmin) or 'venue'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
        state.error = null;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRole = (state) => state.auth.role;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectIsSuperAdmin = (state) => state.auth.role === 'admin';
export const selectIsVenue = (state) => state.auth.role === 'venue';

export default authSlice.reducer;
