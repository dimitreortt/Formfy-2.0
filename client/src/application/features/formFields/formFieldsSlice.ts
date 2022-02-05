import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  awaitingMoveUp: boolean;
  moveUpFail: boolean;
  awaitingMoveDown: boolean;
  moveDownFail: boolean;
};

const initialState: SliceState = {
  awaitingMoveUp: false,
  moveUpFail: false,
  awaitingMoveDown: false,
  moveDownFail: false,
};

const formFieldsSlice = createSlice({
  name: 'formFields',
  initialState,
  reducers: {
    moveFieldUp: () => {},
    moveFieldDown: () => {},
    awaitingMoveUp: (state) => {
      state.awaitingMoveUp = true;
    },
    moveUpFail: (state) => {
      state.moveUpFail = true;
      state.awaitingMoveUp = false;
    },
    awaitingMoveDown: (state) => {
      state.awaitingMoveDown = true;
    },
    moveDownFail: (state) => {
      state.moveDownFail = true;
      state.awaitingMoveDown = false;
    },
  },
});

export const formFieldsActions = formFieldsSlice.actions;
// export const { setForms } = formsSlice.actions;
// export type setFormsType = typeof setForms;
export default formFieldsSlice.reducer;
