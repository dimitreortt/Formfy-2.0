import { NewFieldParams } from "./../../../views/pages/FillForm/AddField";
import { IFormField } from "./../../../domain/FormField";
import { IForm } from "./../../../domain/Form";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
  forms: "not_initialized" | IForm[];
  loadingForms: boolean;
  loadFormsFail: boolean;
  deleteFormFail: boolean;
  awaitingDeleteForm: boolean;
  deleteFormSuccess: boolean;
};

const initialState: SliceState = {
  forms: "not_initialized",
  loadingForms: false,
  loadFormsFail: false,
  deleteFormFail: false,
  awaitingDeleteForm: false,
  deleteFormSuccess: false,
};

const formsSlice = createSlice({
  name: "forms",
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
    swapFieldsIndexes: (
      state,
      action: PayloadAction<[number, number, number]>
    ) => {
      const [formId, fieldIndex1, fieldIndex2] = action.payload;
      if (state.forms === "not_initialized") return;
      const formIndex = state.forms.findIndex((form) => form.id === formId);

      let newFieldsState = [...state.forms[formIndex].fields];
      newFieldsState[fieldIndex1].index = fieldIndex2;
      newFieldsState[fieldIndex2].index = fieldIndex1;

      state.forms[formIndex].fields = newFieldsState.sort(
        (fieldA, fieldB) => fieldA.index - fieldB.index
      );
    },
    getForms: () => {},
    insertAddedField: (state, action: PayloadAction<[number, IFormField]>) => {
      const [formId, newField] = action.payload;
      if (state.forms === "not_initialized") return;
      const formIndex = state.forms.findIndex((form) => form.id === formId);

      const previousState = state.forms[formIndex].fields;
      state.forms[formIndex].fields = previousState.concat([newField]);
    },
    deleteForm: () => {},
    deleteFormFail: (state) => {
      state.awaitingDeleteForm = false;
      state.deleteFormFail = true;
    },
    deleteFormSuccess: (state) => {
      state.awaitingDeleteForm = false;
      state.deleteFormSuccess = true;
    },
    awaitingDeleteForm: (state) => {
      state.awaitingDeleteForm = true;
      state.deleteFormSuccess = false;
      state.deleteFormFail = false;
    },
    ratifyFilteredForms: (state, action: PayloadAction<number>) => {
      const formId = action.payload;
      if (state.forms === "not_initialized") return;
      state.forms = state.forms.filter((form) => form.id !== formId);
    },
    ratifyEditedField: (
      state,
      action: PayloadAction<[number, IFormField, NewFieldParams]>
    ) => {
      const [formId, field, newData] = action.payload;
      if (state.forms === "not_initialized") return;
      const formIndex = state.forms.findIndex((form) => form.id === formId);
      const previousFieldsState = [...state.forms[formIndex].fields];
      const previousField = previousFieldsState[field.index];
      const updatedField = { ...previousField, ...newData };
      const newFieldsState = [...previousFieldsState];
      newFieldsState[field.index] = updatedField;
      state.forms[formIndex].fields = newFieldsState;
    },
  },
});

export const formsActions = formsSlice.actions;
export const { setForms } = formsSlice.actions;
export type setFormsType = typeof setForms;
export default formsSlice.reducer;
