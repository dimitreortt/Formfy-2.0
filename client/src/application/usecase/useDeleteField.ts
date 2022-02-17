import { ApplicationContext } from "./../contexts/ApplicationContext";
import { useContext } from "react";
import { FormFieldsGateway } from "./../../infra/api/FormFieldsGateway";
import { useActions } from "./../hooks/useActions";

export const useDeleteField = (formId: number) => {
  const { deleteField: deleteFieldAction, awaitingDeleteField } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formFieldsGateway = new FormFieldsGateway(httpClient);

  const deleteField = async () => {
    deleteFieldAction();
    try {
      awaitingDeleteField();
      await formFieldsGateway.deleteFormField();
    } catch (error) {}
  };

  return { deleteField };
};
