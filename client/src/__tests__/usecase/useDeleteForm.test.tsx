import React from "react";
import { FetchAdapter } from "../../infra/http/FetchAdapter";
import { useDeleteForm } from "../../application/usecase/useDeleteForm";
import FormsGateway from "../../infra/api/FormsGateway";

type UseContextType = typeof React.useContext;

let realContext: UseContextType;
let mockContext: UseContextType;

beforeEach(() => {
  realContext = React.useContext;
  mockContext = React.useContext = jest.fn;
});

afterAll(() => {
  React.useContext = realContext;
});

test.only("Should call formsGateway.deleteForms", async () => {
  const gatewayDeleteFormSpy = jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockReturnValue("");

  const { deleteForm } = useDeleteForm();
  deleteForm();

  expect(gatewayDeleteFormSpy).toHaveBeenCalled();
});
