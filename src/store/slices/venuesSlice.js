import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// Async thunk for fetching venues
export const fetchVenues = createAsyncThunk(
    'venues/fetchVenues',
    async ({ pageNumber = 1, pageSize = 10, searchTerm = '', filterStatus = 'all' }, { rejectWithValue }) => {
        try {
            const response = await api.get('/venues', {
                params: {
                    page: pageNumber - 1, // API uses 0-based indexing
                    size: pageSize,
                    search: searchTerm,
                    status: filterStatus !== 'all' ? filterStatus : undefined
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch venues');
        }
    }
);

// Async thunk for adding a new venue
export const addVenue = createAsyncThunk(
    'venues/addVenue',
    async (venueData, { rejectWithValue }) => {
        try {
            const response = await api.post('/venues/add', venueData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to add venue');
        }
    }
);

const initialState = {
    venues: [],
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

const venuesSlice = createSlice({
    name: 'venues',
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
            // Fetch venues
            .addCase(fetchVenues.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVenues.fulfilled, (state, action) => {
                state.loading = false;
                state.venues = action.payload.data.content;
                state.pagination = {
                    pageNumber: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    last: action.payload.data.last,
                    totalElements: action.payload.data.totalElements,
                    totalPages: action.payload.data.totalPages
                };
            })
            .addCase(fetchVenues.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch venues';
            })
            // Add venue
            .addCase(addVenue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addVenue.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'Venue created successfully!';
            })
            .addCase(addVenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to add venue';
            });
    }
});

export const { clearError, clearSuccess, setSearchTerm, setFilterStatus } = venuesSlice.actions;
export default venuesSlice.reducer;

// Selectors
export const selectVenues = (state) => state.venues.venues;
export const selectVenuesPagination = (state) => state.venues.pagination;
export const selectVenuesLoading = (state) => state.venues.loading;
export const selectVenuesError = (state) => state.venues.error;
export const selectVenuesSuccess = (state) => state.venues.success;
