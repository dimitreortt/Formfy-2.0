import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Form = {
  name: string;
};

type SliceState = {
  forms: 'not_initialized' | Form[];
  loadingForms: boolean;
  loadFormsFail: boolean;
};

const initialState: SliceState = {
  forms: 'not_initialized',
  loadingForms: false,
  loadFormsFail: false,
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<Form[]>) => {
      const forms = action.payload;
      state.forms = forms;
    },
    setLoadingForms: (state) => {
      state.loadingForms = true;
    },
    setLoadFormsSuccess: (state) => {
      state.loadingForms = false;
    },
    setLoadFormsFail: (state) => {
      state.loadingForms = false;
      state.loadFormsFail = true;
    },
  },
});

export const formsActions = formsSlice.actions;
export const { setForms } = formsSlice.actions;
export type setFormsType = typeof setForms;
export default formsSlice.reducer;
