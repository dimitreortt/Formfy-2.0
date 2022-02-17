import React from "react";
import { formsActions } from "../../application/features/forms/formsSlice";
import { useEditField } from "../../application/usecase/useEditField";
import { useDispatch } from "react-redux";
import { FormFieldsGateway } from "../../infra/api/FormFieldsGateway";
import {
  mockUseContext,
  unMockUseContext,
} from "../../__testsUtils/mockUseContext";
import { IFormField } from "../../domain/FormField";
import { NewFieldParams } from "../../views/pages/FillForm/AddField";
// import { deleteFormFail } from "";

let mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

let fakeField: any = {};
let fakeNewData: any = {};
let editField: (field: IFormField, newData: NewFieldParams) => Promise<any>;

beforeAll(() => {
  mockUseContext(jest);
  const FORM_ID = 1;
  editField = useEditField(FORM_ID).editField;
});

afterEach(() => {
  mockDispatch.mockClear();
});

afterAll(() => {
  unMockUseContext();
});

const mockGatewayEditFieldThrowError = () => {
  return jest
    .spyOn(FormFieldsGateway.prototype, "updateFormField")
    .mockImplementation(() => {
      throw new Error("Could not delete!");
    });
};

const mockGatewayUpdateFieldSuccess = () => {
  return jest
    .spyOn(FormFieldsGateway.prototype, "updateFormField")
    .mockReturnValue(undefined);
};

test("Should dispatch action editField()", async () => {
  await editField(fakeField, fakeNewData);
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/editField",
    })
  );
});

test("Should dispatch action awaitingEditField()", async () => {
  await editField(fakeField, fakeNewData);
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/awaitingEditField",
    })
  );
});

test("Should call formsFieldsGateway.updateField", async () => {
  const gatewayUpdateFieldSpy = mockGatewayUpdateFieldSuccess();
  await editField(fakeField, fakeNewData);
  expect(gatewayUpdateFieldSpy).toHaveBeenCalled();
  gatewayUpdateFieldSpy.mockClear();
});

test("Should dispatch ratifyEditedField() on edit field success", async () => {
  const gatewayUpdateFieldSpy = mockGatewayUpdateFieldSuccess();
  await editField(fakeField, fakeNewData);
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({ type: "forms/ratifyEditedField" })
  );
  gatewayUpdateFieldSpy.mockClear();
});

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
