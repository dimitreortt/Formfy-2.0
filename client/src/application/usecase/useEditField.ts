import { IFormField } from "./../../domain/FormField";
import { NewFieldParams } from "./../../views/pages/FillForm/AddField";
import { FormFieldsGateway } from "./../../infra/api/FormFieldsGateway";
import { ApplicationContext } from "./../contexts/ApplicationContext";
import { useContext } from "react";
import { useActions } from "./../hooks/useActions";

export const useEditField = (formId: number) => {
  const { editField: editFieldAction, awaitingEditField } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formFieldsGateway = new FormFieldsGateway(httpClient);

  const editField = async (field: IFormField, newData: NewFieldParams) => {
    editFieldAction();
    try {
      const updateParams = {
        id: field.id,
        index: field.index,
        newOptions: newData.options,
      };

      awaitingEditField();
      await formFieldsGateway.updateFormField(formId, field, newData);
      const value: any = "";
      return value;
    } catch (error: any) {
      return error.message;
    }
  };

  return { editField };
};
