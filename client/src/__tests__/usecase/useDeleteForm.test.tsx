import React from "react";
import { formsActions } from "../../application/features/forms/formsSlice";
import { useDeleteForm } from "../../application/usecase/useDeleteForm";
import { useDispatch } from "react-redux";
import FormsGateway from "../../infra/api/FormsGateway";
// import { deleteFormFail } from "";
import {
  mockUseContext,
  unMockUseContext,
} from "../../__testsUtils/mockUseContext";

let mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

let deleteForm: () => Promise<any>;

beforeAll(() => {
  mockUseContext(jest);
  const FORM_ID = 1;
  deleteForm = useDeleteForm(FORM_ID).deleteForm;
});

afterEach(() => {
  mockDispatch.mockClear();
});

afterAll(() => {
  unMockUseContext();
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

test("Should dispatch ratifyFilteredForms() on delete form success", async () => {
  const gatewayDeleteFormSpy = mockGatewayDeleteFormSuccess();
  await deleteForm();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({ type: "forms/ratifyFilteredForms" })
  );
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
