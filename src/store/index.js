import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import venuesReducer from './slices/venuesSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    venues: venuesReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/loginSuccess', 'auth/logout'],
      },
    }),
});

export default store;
