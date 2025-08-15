import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';
import axios from 'axios';
const token = localStorage.getItem('token');
// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ pageNumber = 1, pageSize = 10, searchTerm = '', filterStatus = 'all' }, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://api.dropofficial.app/api/v1/users?page=1&size=100', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            // Handle different error formats
            if (error.response?.data) {
                return rejectWithValue(error.response.data);
            } else if (error.message) {
                return rejectWithValue({ message: error.message });
            } else {
                return rejectWithValue({ message: 'Failed to fetch users' });
            }
        }
    }
);

// Async thunk for adding a new user
export const addUser = createAsyncThunk(
    'users/addUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/users/add/user', userData);
            return response.data;
        } catch (error) {
            // Handle different error formats
            if (error.response?.data) {
                return rejectWithValue(error.response.data);
            } else if (error.message) {
                return rejectWithValue({ message: error.message });
            } else {
                return rejectWithValue({ message: 'Failed to add user' });
            }
        }
    }
);

const initialState = {
    users: [],
    pagination: {
        pageNumber: 1,
        pageSize: 10,
        last: true,
        totalElements: 0,
        totalPages: 1
    },
    loading: false,
    error: null,
    success: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data.content;
                state.pagination = {
                    pageNumber: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    last: action.payload.data.last,
                    totalElements: action.payload.data.totalElements,
                    totalPages: action.payload.data.totalPages
                };
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                // Handle different error formats
                if (action.payload?.message) {
                    state.error = action.payload.message;
                } else if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = 'Failed to fetch users';
                }
            })
            // Add user
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'User created successfully!';
                // Optionally refresh the users list
                // You can dispatch fetchUsers here if needed
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                // Handle different error formats
                if (action.payload?.message) {
                    state.error = action.payload.message;
                } else if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = 'Failed to add user';
                }
            });
    }
});

export const { clearError, clearSuccess, setSearchTerm, setFilterStatus } = usersSlice.actions;
export default usersSlice.reducer;

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectUsersPagination = (state) => state.users.pagination;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;
export const selectUsersSuccess = (state) => state.users.success;
