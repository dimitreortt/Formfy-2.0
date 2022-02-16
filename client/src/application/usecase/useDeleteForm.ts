import React from "react";
import { ApplicationContext } from "./../contexts/ApplicationContext";
import { useContext } from "react";
import { FormsGateway } from "./../../infra/api/FormsGateway";

export const useDeleteForm = () => {
  const { httpClient } = useContext(ApplicationContext);
  const formsGateway = new FormsGateway(httpClient);

  const deleteForm = () => {
    formsGateway.deleteForm("formName");
  };

  return { deleteForm };
};
