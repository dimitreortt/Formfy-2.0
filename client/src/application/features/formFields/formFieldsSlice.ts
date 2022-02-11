import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
  awaitingMoveUp: boolean;
  moveUpSuccess: boolean;
  moveUpFail: boolean;
  awaitingMoveDown: boolean;
  moveDownSuccess: boolean;
  moveDownFail: boolean;
  awaitingAddField: boolean;
  addFieldSuccess: boolean;
  addFieldFail: boolean;
};

const initialState: SliceState = {
  awaitingMoveUp: false,
  moveUpSuccess: false,
  moveUpFail: false,
  awaitingMoveDown: false,
  moveDownSuccess: false,
  moveDownFail: false,
  awaitingAddField: false,
  addFieldSuccess: false,
  addFieldFail: false,
};

const formFieldsSlice = createSlice({
  name: "formFields",
  initialState,
  reducers: {
    moveFieldUp: () => {},
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
    moveFieldDown: () => {},
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
    addField: (state) => {},
    awaitingAddField: (state) => {
      state.awaitingAddField = true;
    },
    addFieldSuccess: (state) => {
      state.awaitingAddField = false;
      state.addFieldSuccess = true;
    },
    addFieldFail: (state) => {
      state.awaitingAddField = false;
      state.addFieldFail = true;
    },
  },
});

export const formFieldsActions = formFieldsSlice.actions;
// export const { setForms } = formsSlice.actions;
// export type setFormsType = typeof setForms;
export default formFieldsSlice.reducer;
