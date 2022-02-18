import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {};

const initialState: SliceState = {};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pageLoaded: () => {},
  },
});

export const uiActions = uiSlice.actions;
export const { pageLoaded } = uiSlice.actions;
export type pageLoadedType = typeof pageLoaded;
export default uiSlice.reducer;
