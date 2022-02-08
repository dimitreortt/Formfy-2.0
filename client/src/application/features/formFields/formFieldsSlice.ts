import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
  awaitingMoveUp: boolean;
  moveUpSuccess: boolean;
  moveUpFail: boolean;
  awaitingMoveDown: boolean;
  moveDownSuccess: boolean;
  moveDownFail: boolean;
};

const initialState: SliceState = {
  awaitingMoveUp: false,
  moveUpSuccess: false,
  moveUpFail: false,
  awaitingMoveDown: false,
  moveDownSuccess: false,
  moveDownFail: false,
};

const formFieldsSlice = createSlice({
  name: "formFields",
  initialState,
  reducers: {
    moveFieldUp: () => {},
    moveFieldDown: () => {},
    awaitingMoveUp: (state) => {
      state.awaitingMoveUp = true;
      state.moveUpSuccess = false;
      state.moveUpFail = false;
    },
    moveUpSuccess: (state) => {
      state.moveUpSuccess = true;
      state.awaitingMoveUp = false;
    },
    moveUpFail: (state) => {
      state.moveUpFail = true;
      state.awaitingMoveUp = false;
    },
    awaitingMoveDown: (state) => {
      state.awaitingMoveDown = true;
      state.moveDownSuccess = false;
      state.moveDownFail = false;
    },
    moveDownSuccess: (state) => {
      state.moveDownSuccess = true;
      state.awaitingMoveDown = false;
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
