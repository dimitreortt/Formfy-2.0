import React from "react";
import { formsActions } from "../../application/features/forms/formsSlice";
import { useEditField } from "../../application/usecase/useEditField";
import { useDispatch } from "react-redux";
import FormsGateway from "../../infra/api/FormsGateway";
import {
  mockUseContext,
  unMockUseContext,
} from "../../__testsUtils/mockUseContext";
// import { deleteFormFail } from "";

let mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

let editField: () => Promise<any>;

beforeAll(() => {
  const FORM_ID = 1;
  editField = useEditField(FORM_ID).editField;
  mockUseContext(jest);
});

afterEach(() => {
  mockDispatch.mockClear();
});

afterAll(() => {
  unMockUseContext();
});

const mockGatewayEditFieldThrowError = () => {
  return jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockImplementation(() => {
      throw new Error("Could not delete!");
    });
};

const mockGatewayEditFieldSuccess = () => {
  return jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockReturnValue(undefined);
};

// test("Should dispatch action editField()", async () => {
//   await editField();
//   expect(mockDispatch).toHaveBeenCalled();
//   expect(mockDispatch).toHaveBeenCalledWith(
//     expect.objectContaining({
//       type: "forms/editField",
//     })
//   );
// });

// test("Should dispatch action awaitingDeleteForm()", async () => {
//   await deleteForm();
//   expect(mockDispatch).toHaveBeenCalled();
//   expect(mockDispatch).toHaveBeenCalledWith(
//     expect.objectContaining({
//       type: "forms/awaitingDeleteForm",
//     })
//   );
// });

// test("Should dispatch ratifyFilteredForms() on delete form success", async () => {
//   const gatewayDeleteFormSpy = mockGatewayDeleteFormSuccess();
//   await deleteForm();
//   expect(mockDispatch).toHaveBeenCalledWith(
//     expect.objectContaining({ type: "forms/ratifyFilteredForms" })
//   );
//   gatewayDeleteFormSpy.mockClear();
// });

// test("Should call formsGateway.deleteForms", async () => {
//   const gatewayDeleteFormSpy = mockGatewayDeleteFormSuccess();
//   await deleteForm();
//   expect(gatewayDeleteFormSpy).toHaveBeenCalled();
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
