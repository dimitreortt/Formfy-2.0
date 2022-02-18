import { useActions } from "./../hooks/useActions";
import React from "react";
import { ApplicationContext } from "./../contexts/ApplicationContext";
import { useContext } from "react";
import { FormsGateway } from "./../../infra/api/FormsGateway";
import { store } from "../store/configureStore";

export const useDeleteForm = (formId: number) => {
  const { httpClient } = useContext(ApplicationContext);
  const formsGateway = new FormsGateway(httpClient);

  const {
    deleteForm: deleteFormAction,
    deleteFormFail,
    deleteFormSuccess,
    awaitingDeleteForm,
    removeDeletedForm,
  } = useActions();

  const deleteForm = async () => {
    deleteFormAction();
    try {
      awaitingDeleteForm();
      await formsGateway.deleteForm("formName");
      deleteFormSuccess();
      removeDeletedForm(formId);
    } catch (error: any) {
      deleteFormFail();
      return error.message;
    }
  };

  return { deleteForm };
};
