import { IForm } from './../../../domain/Form';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  forms: 'not_initialized' | IForm[];
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
    setForms: (state, action: PayloadAction<IForm[]>) => {
      const forms = action.payload;
      state.forms = forms;
    },
    loadingForms: (state) => {
      state.loadingForms = true;
    },
    loadFormsSuccess: (state) => {
      state.loadingForms = false;
    },
    loadFormsFail: (state) => {
      state.loadingForms = false;
      state.loadFormsFail = true;
    },
    getForms: () => {},
  },
});

export const formsActions = formsSlice.actions;
export const { setForms } = formsSlice.actions;
export type setFormsType = typeof setForms;
export default formsSlice.reducer;
