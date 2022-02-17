import React from "react";
import { formsActions } from "../../application/features/forms/formsSlice";
import { useDeleteField } from "../../application/usecase/useDeleteField";
import { useDispatch } from "react-redux";
import { FormFieldsGateway } from "../../infra/api/FormFieldsGateway";
// import { deleteFormFail } from "";
import {
  mockUseContext,
  unMockUseContext,
} from "../../__testsUtils/mockUseContext";

let mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

let deleteField: () => Promise<any>;

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
  await deleteField();
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/deleteField",
    })
  );
});

test("Should dispatch action awaitingDeleteField()", async () => {
  await deleteField();
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/awaitingDeleteField",
    })
  );
});

// test("Should call formsGateway.deleteForms", async () => {
//   const gatewayDeleteFormSpy = mockGatewayDeleteFormSuccess();
//   await deleteForm();
//   expect(gatewayDeleteFormSpy).toHaveBeenCalled();
//   gatewayDeleteFormSpy.mockClear();
// });

// test("Should dispatch ratifyFilteredForms() on delete form success", async () => {
//   const gatewayDeleteFormSpy = mockGatewayDeleteFormSuccess();
//   await deleteForm();
//   expect(mockDispatch).toHaveBeenCalledWith(
//     expect.objectContaining({ type: "forms/ratifyFilteredForms" })
//   );
//   gatewayDeleteFormSpy.mockClear();
// });

// test("Should dispatch deleteFormSuccess() if no error occurred", async () => {
//   const gatewayDeleteFormSpy = mockGatewayDeleteFormSuccess();
//   await deleteForm();
//   expect(mockDispatch).toHaveBeenCalledWith(
//     expect.objectContaining({
//       type: "forms/deleteFormSuccess",
//     })
//   );
//   gatewayDeleteFormSpy.mockClear();
// });

// test("Should dispatch action deleteFormFail() when error occurred", async () => {
//   const gatewayDeleteFormSpy = mockGatewayDeleteFormThrowError();
//   await deleteForm();
//   expect(mockDispatch).toHaveBeenCalled();
//   expect(mockDispatch).toHaveBeenCalledWith(
//     expect.objectContaining({
//       type: "forms/deleteFormFail",
//     })
//   );
//   gatewayDeleteFormSpy.mockClear();
// });

// test("Should return error message when error occur", async () => {
//   const gatewayDeleteFormSpy = mockGatewayDeleteFormThrowError();
//   const errorMessage = await deleteForm();
//   expect(errorMessage).toBe("Could not delete!");
//   gatewayDeleteFormSpy.mockClear();
// });
