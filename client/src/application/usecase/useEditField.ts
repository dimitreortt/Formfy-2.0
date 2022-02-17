import { IFormField } from "./../../domain/FormField";
import { NewFieldParams } from "./../../views/pages/FillForm/AddField";
import { FormFieldsGateway } from "./../../infra/api/FormFieldsGateway";
import { ApplicationContext } from "./../contexts/ApplicationContext";
import { useContext } from "react";
import { useActions } from "./../hooks/useActions";

export const useEditField = (formId: number) => {
  const {
    editField: editFieldAction,
    awaitingEditField,
    ratifyEditedField,
    editFieldSuccess,
  } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formFieldsGateway = new FormFieldsGateway(httpClient);

  const editField = async (field: IFormField, newData: NewFieldParams) => {
    editFieldAction();
    try {
      awaitingEditField();
      await formFieldsGateway.updateFormField(formId, field, newData);
      editFieldSuccess();
      ratifyEditedField([formId, field, newData]);
    } catch (error: any) {
      return error.message;
    }
  };

  return { editField };
};
