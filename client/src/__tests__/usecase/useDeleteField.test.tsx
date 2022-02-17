import React from "react";
import { useDeleteField } from "../../application/usecase/useDeleteField";
import { useDispatch } from "react-redux";
import { FormFieldsGateway } from "../../infra/api/FormFieldsGateway";
import {
  mockUseContext,
  unMockUseContext,
} from "../../__testsUtils/mockUseContext";
import { IFormField } from "../../domain/FormField";

let mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

const fakeField: any = {};
let deleteField: (field: IFormField) => Promise<any>;

beforeAll(() => {
  mockUseContext(jest);
  const FORM_ID = 1;
  deleteField = useDeleteField(FORM_ID).deleteField;
});

afterEach(() => {
  mockDispatch.mockClear();
});

afterAll(() => {
  unMockUseContext();
});

const mockGatewayDeleteFieldThrowError = () => {
  return jest
    .spyOn(FormFieldsGateway.prototype, "deleteFormField")
    .mockImplementation(() => {
      throw new Error("Could not delete field!");
    });
};

const mockGatewayDeleteFieldSuccess = () => {
  return jest
    .spyOn(FormFieldsGateway.prototype, "deleteFormField")
    .mockReturnValue(undefined);
};

test("Should dispatch action deleteField()", async () => {
  await deleteField(fakeField);
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/deleteField",
    })
  );
});

test("Should dispatch action awaitingDeleteField()", async () => {
  await deleteField(fakeField);
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/awaitingDeleteField",
    })
  );
});

test("Should call formFieldsGateway.deleteFormField", async () => {
  const gatewayDeleteFieldSpy = mockGatewayDeleteFieldSuccess();
  await deleteField(fakeField);
  expect(gatewayDeleteFieldSpy).toHaveBeenCalled();
  gatewayDeleteFieldSpy.mockClear();
});

test("Should dispatch ratifyFilteredFormFields() on delete form success", async () => {
  const gatewayDeleteFieldSpy = mockGatewayDeleteFieldSuccess();
  await deleteField(fakeField);
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({ type: "forms/ratifyFilteredFormFields" })
  );
  gatewayDeleteFieldSpy.mockClear();
});

test("Should dispatch deleteFieldSuccess() if no error occurred", async () => {
  const gatewayDeleteFieldSpy = mockGatewayDeleteFieldSuccess();
  await deleteField(fakeField);
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/deleteFieldSuccess",
    })
  );
  gatewayDeleteFieldSpy.mockClear();
});

test("Should dispatch action deleteFieldFail() when error occurred", async () => {
  const gatewayDeleteFieldSpy = mockGatewayDeleteFieldThrowError();
  await deleteField(fakeField);
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/deleteFieldFail",
    })
  );
  gatewayDeleteFieldSpy.mockClear();
});

test("Should return error message when error occur", async () => {
  const gatewayDeleteFieldSpy = mockGatewayDeleteFieldThrowError();
  const errorMessage = await deleteField(fakeField);
  expect(errorMessage).toBe("Could not delete field!");
  gatewayDeleteFieldSpy.mockClear();
});
