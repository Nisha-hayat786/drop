import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({ pageNumber = 1, pageSize = 10, searchTerm = '', filterStatus = 'all' }, { rejectWithValue }) => {
        try {
            const response = await api.get('/posts', {
                params: {
                    page: pageNumber - 1, // API uses 0-based indexing
                    size: pageSize,
                    search: searchTerm,
                    status: filterStatus !== 'all' ? filterStatus : undefined
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch posts');
        }
    }
);

const initialState = {
    posts: [],
    pagination: {
        pageNumber: 1,
        pageSize: 10,
        last: true,
        totalElements: 0,
        totalPages: 1
    },
    loading: false,
    error: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
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
            // Fetch posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.data.content;
                state.pagination = {
                    pageNumber: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    last: action.payload.data.last,
                    totalElements: action.payload.data.totalElements,
                    totalPages: action.payload.data.totalPages
                };
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch posts';
            });
    }
});

export const { clearError, setSearchTerm, setFilterStatus } = postsSlice.actions;
export default postsSlice.reducer;

// Selectors
export const selectPosts = (state) => state.posts.posts;
export const selectPostsPagination = (state) => state.posts.pagination;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectPostsError = (state) => state.posts.error;
