
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import projectsReducer from './slices/projectsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
