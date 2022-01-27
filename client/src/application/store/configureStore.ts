import { configureStore } from '@reduxjs/toolkit';
import formsReducer from '../features/forms/formsSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
//@ts-ignore
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
