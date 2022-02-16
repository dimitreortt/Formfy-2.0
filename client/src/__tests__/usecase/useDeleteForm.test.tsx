import React from "react";
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

test("Should call formsGateway.deleteForms", async () => {
  const gatewayDeleteFormSpy = jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockReturnValue("");

  const { deleteForm } = useDeleteForm();
  deleteForm();

  expect(gatewayDeleteFormSpy).toHaveBeenCalled();
});

test.only("Should return error message when error ocurr", async () => {
  const gatewayDeleteFormSpy = jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockImplementation(() => {
      throw new Error("Could not delete!");
    });

  const { deleteForm } = useDeleteForm();

  const errorMessage = deleteForm();
  expect(errorMessage).toBe("Could not delete!");
});
