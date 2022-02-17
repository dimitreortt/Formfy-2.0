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
      throw new Error("Could not update field!");
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

test("Should dispatch editFieldSuccess() if no error occurred ", async () => {
  const gatewayUpdateFieldSpy = mockGatewayUpdateFieldSuccess();
  await editField(fakeField, fakeNewData);
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/editFieldSuccess",
    })
  );
  gatewayUpdateFieldSpy.mockClear();
});

test("Should dispatch action editFieldFail() when error occurred", async () => {
  const gatewayUpdateFieldSpy = mockGatewayEditFieldThrowError();
  await editField(fakeField, fakeNewData);
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "formFields/editFieldFail",
    })
  );
  gatewayUpdateFieldSpy.mockClear();
});

test("Should return error message when error occur", async () => {
  const gatewayUpdateFieldSpy = mockGatewayEditFieldThrowError();
  const errorMessage = await editField(fakeField, fakeNewData);
  expect(errorMessage).toBe("Could not update field!");
  gatewayUpdateFieldSpy.mockClear();
});
