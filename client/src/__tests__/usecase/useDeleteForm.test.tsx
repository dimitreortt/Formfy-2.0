import React from "react";
import { FetchAdapter } from "../../infra/http/FetchAdapter";
import { useDeleteForm } from "../../application/usecase/useDeleteForm";
import FormsGateway from "../../infra/api/FormsGateway";

test.only("Should call formsGateway.deleteForms", async () => {
  const gatewayDeleteFormSpy = jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockReturnValue("");

  const { deleteForm } = useDeleteForm();
  deleteForm();

  expect(gatewayDeleteFormSpy).toHaveBeenCalled();
});
