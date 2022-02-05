import { configureStore } from '@reduxjs/toolkit';
import formsReducer from '../features/forms/formsSlice';
import formFieldsReducer from '../features/formFields/formFieldsSlice';
import registriesReducer from '../features/registries/registriesSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    formFields: formFieldsReducer,
    registries: registriesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
//@ts-ignore
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
