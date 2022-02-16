import React from "react";
import { formsActions } from "../../application/features/forms/formsSlice";
import { store } from "../../application/store/configureStore";
import { useDeleteForm } from "../../application/usecase/useDeleteForm";
import { useDispatch } from "react-redux";
import FormsGateway from "../../infra/api/FormsGateway";
// import { deleteFormFail } from "";

let mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

type UseContextType = typeof React.useContext;

let realContext: UseContextType;
let mockContext: UseContextType;

beforeEach(() => {
  realContext = React.useContext;
  mockContext = React.useContext = jest.fn;
});

afterEach(() => {
  mockDispatch.mockClear();
});

afterAll(() => {
  React.useContext = realContext;
});

test("Should call formsGateway.deleteForms", async () => {
  const gatewayDeleteFormSpy = jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockReturnValue("");

  const { deleteForm } = useDeleteForm();
  await deleteForm();

  expect(gatewayDeleteFormSpy).toHaveBeenCalled();
});

const mockGatewayDeleteFormThrowError = () => {
  return jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockImplementation(() => {
      throw new Error("Could not delete!");
    });
};

const mockGatewayDeleteFormSuccess = () => {
  return jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockReturnValue(undefined);
};

test("Should dipatch action deleteForm()", async () => {
  const { deleteForm } = useDeleteForm();

  await deleteForm();
  expect(mockDispatch).toHaveBeenCalled();

  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "forms/deleteForm",
    })
  );
});

test("Should dipatch action deleteFormFail() when error occured", async () => {
  const gatewayDeleteFormSpy = mockGatewayDeleteFormThrowError();

  const { deleteForm } = useDeleteForm();

  await deleteForm();

  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "forms/deleteFormFail",
    })
  );

  gatewayDeleteFormSpy.mockClear();
});

test("Should return error message when error occur", async () => {
  const gatewayDeleteFormSpy = mockGatewayDeleteFormThrowError();

  const { deleteForm } = useDeleteForm();

  const errorMessage = await deleteForm();
  expect(errorMessage).toBe("Could not delete!");

  gatewayDeleteFormSpy.mockClear();
});
