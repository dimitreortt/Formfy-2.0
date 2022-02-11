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

  const addField = async (field: IFormField) => {
    addFieldAction();
    try {
      awaitingAddField();
      const response = await formFieldsGateway.add(formId, field);
      addFieldSuccess();
      insertAddedField([formId, { ...field, index: response.index }]);
    } catch (error) {
      addFieldFail();
    }
  };

  return { addField };
};
