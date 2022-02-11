import { IFormField } from "./../../domain/FormField";
import { FormFieldsGateway } from "./../../infra/api/FormFieldsGateway";
import { FormsAssembler } from "../service/FormsAssembler";
import { ApplicationContext } from "../contexts/ApplicationContext";
import { useContext } from "react";
import { FormsGateway } from "../../infra/api/FormsGateway";
import { useActions } from "../hooks/useActions";

export const useAddField = (formId: number) => {
  const {
    addField: addFieldAction,
    awaitingAddField,
    addFieldSuccess,
    insertAddedField,
    addFieldFail,
  } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formFieldsGateway = new FormFieldsGateway(httpClient);

  const addField = async (
    field: Pick<IFormField, "label" | "type" | "options">
  ) => {
    addFieldAction();
    try {
      awaitingAddField();
      const response = await formFieldsGateway.add(formId, field);
      console.log(response);
      addFieldSuccess();
      insertAddedField([formId, { ...field, index: response.index }]);
    } catch (error: any) {
      console.log(error);
      console.log(error.message);
      addFieldFail();
      return error.message;
    }
  };

  return { addField };
};
