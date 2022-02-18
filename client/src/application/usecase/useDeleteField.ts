import { IFormField } from "./../../domain/FormField";
import { ApplicationContext } from "./../contexts/ApplicationContext";
import { useContext } from "react";
import { FormFieldsGateway } from "./../../infra/api/FormFieldsGateway";
import { useActions } from "./../hooks/useActions";

export const useDeleteField = (formId: number) => {
  const {
    deleteField: deleteFieldAction,
    awaitingDeleteField,
    removeDeletedField,
    deleteFieldSuccess,
    deleteFieldFail,
  } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formFieldsGateway = new FormFieldsGateway(httpClient);

  const deleteField = async (field: IFormField) => {
    deleteFieldAction();
    try {
      awaitingDeleteField();
      await formFieldsGateway.deleteFormField(formId, field.label);
      deleteFieldSuccess();
      removeDeletedField([formId, field]);
    } catch (error: any) {
      deleteFieldFail();
      return error.message;
    }
  };

  return { deleteField };
};
