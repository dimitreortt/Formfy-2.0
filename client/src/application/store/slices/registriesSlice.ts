import { IRegistry } from '../../domain/Registry';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  registries: 'not_initialized' | IRegistry[];
  loadingRegistries: boolean;
  loadRegistriesFail: boolean;
};

const initialState: SliceState = {
  registries: 'not_initialized',
  loadingRegistries: false,
  loadRegistriesFail: false,
};

const registriesSlice = createSlice({
  name: 'registries',
  initialState,
  reducers: {
    setRegistries: (state, action: PayloadAction<IRegistry[]>) => {
      const registries = action.payload;
      state.registries = registries;
    },
    loadingRegistries: (state) => {
      state.loadingRegistries = true;
    },
    setLoadRegistriesSuccess: (state) => {
      state.loadingRegistries = false;
    },
    setLoadRegistriesFail: (state) => {
      state.loadingRegistries = false;
      state.loadRegistriesFail = true;
    },
    getRegistries: () => {},
  },
});

export const registriesActions = registriesSlice.actions;
export const { setRegistries } = registriesSlice.actions;
export type setRegistriesType = typeof setRegistries;
export default registriesSlice.reducer;
