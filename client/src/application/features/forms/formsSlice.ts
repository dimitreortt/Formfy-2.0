import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Form = {
  name: string;
};

type SliceState = {
  forms: 'not_initialized' | Form[];
  loadingForms: boolean;
};
const initialState: SliceState = { forms: 'not_initialized', loadingForms: false };

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<Form[]>) => {
      const forms = action.payload;
      state.forms = forms;
    },
    setLoadingForms: (state, action: PayloadAction<boolean>) => {
      state.loadingForms = action.payload;
    },
    loadFormsSuccess: (state) => {
      state.loadingForms = false;
    },
    getFormsFail: (state) => {
      state.loadingForms = false;
    },
    setLoadFormsFail: (state) => {
      state.loadingForms = false;
    },
  },
});

const { setForms } = formsSlice.actions;
export type setFormsType = typeof setForms;
export const formsActions = formsSlice.actions;
console.log(formsActions);
export default formsSlice.reducer;
