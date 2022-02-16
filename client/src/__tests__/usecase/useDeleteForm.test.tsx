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
let deleteForm: () => Promise<any>;

beforeAll(() => {
  realContext = React.useContext;
  mockContext = React.useContext = jest.fn;
  deleteForm = useDeleteForm().deleteForm;
});

afterEach(() => {
  mockDispatch.mockClear();
});

afterAll(() => {
  React.useContext = realContext;
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

test("Should dispatch action deleteForm()", async () => {
  await deleteForm();
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "forms/deleteForm",
    })
  );
});

test("Should dispatch action awaitingDeleteForm()", async () => {
  const gatewayDeleteFormSpy = mockGatewayDeleteFormSuccess();
  await deleteForm();
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "forms/awaitingDeleteForm",
    })
  );
});

test("Should call formsGateway.deleteForms", async () => {
  const gatewayDeleteFormSpy = mockGatewayDeleteFormSuccess();
  await deleteForm();
  expect(gatewayDeleteFormSpy).toHaveBeenCalled();
  gatewayDeleteFormSpy.mockClear();
});

test("Should dispatch deleteFormSuccess() if no error occurred", async () => {
  const gatewayDeleteFormSpy = mockGatewayDeleteFormSuccess();
  await deleteForm();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "forms/deleteFormSuccess",
    })
  );
  gatewayDeleteFormSpy.mockClear();
});

test("Should dispatch action deleteFormFail() when error occurred", async () => {
  const gatewayDeleteFormSpy = mockGatewayDeleteFormThrowError();
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
  const errorMessage = await deleteForm();
  expect(errorMessage).toBe("Could not delete!");
  gatewayDeleteFormSpy.mockClear();
});
