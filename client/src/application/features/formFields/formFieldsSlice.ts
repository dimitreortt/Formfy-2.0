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
  awaitingEditField: boolean;
  editFieldSuccess: boolean;
  editFieldFail: boolean;
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
  awaitingEditField: false,
  editFieldSuccess: false,
  editFieldFail: false,
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
      state.addFieldSuccess = false;
      state.addFieldFail = false;
    },
    addFieldSuccess: (state) => {
      state.awaitingAddField = false;
      state.addFieldSuccess = true;
    },
    addFieldFail: (state) => {
      state.awaitingAddField = false;
      state.addFieldFail = true;
    },
    editField: (state) => {},
    awaitingEditField: (state) => {
      state.awaitingEditField = true;
      state.editFieldSuccess = false;
      state.editFieldFail = false;
    },
    editFieldSuccess: (state) => {
      state.awaitingEditField = false;
      state.editFieldSuccess = true;
    },
    editFieldFail: (state) => {
      state.awaitingEditField = false;
      state.editFieldFail = true;
    },
  },
});

export const formFieldsActions = formFieldsSlice.actions;
// export const { setForms } = formsSlice.actions;
// export type setFormsType = typeof setForms;
export default formFieldsSlice.reducer;
