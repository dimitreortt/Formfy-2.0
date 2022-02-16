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
  deleteForm();

  expect(gatewayDeleteFormSpy).toHaveBeenCalled();
});

const mockGatewayDeleteFormThrowError = () => {
  return jest
    .spyOn(FormsGateway.prototype, "deleteForm")
    .mockImplementation(() => {
      throw new Error("Could not delete!");
    });
};

test("Should dipatch action deleteForm()", async () => {
  const { deleteForm } = useDeleteForm();

  deleteForm();
  expect(mockDispatch).toHaveBeenCalled();

  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "forms/deleteForm",
    })
  );
});

test.only("Should dipatch action deleteFormFail() when error ocurred", async () => {
  const gatewayDeleteFormSpy = mockGatewayDeleteFormThrowError();

  const { deleteForm } = useDeleteForm();

  deleteForm();

  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "forms/deleteFormFail",
    })
  );

  gatewayDeleteFormSpy.mockClear();
});

test("Should return error message when error ocurr", async () => {
  const gatewayDeleteFormSpy = mockGatewayDeleteFormThrowError();

  const { deleteForm } = useDeleteForm();

  const errorMessage = deleteForm();
  expect(errorMessage).toBe("Could not delete!");

  gatewayDeleteFormSpy.mockClear();
});

// test("testando o redux toolkit store", () => {
//   const dispatchSpy = jest.spyOn(store, "dispatch");
//   const dispatch = store.dispatch;

//   const { getForms } = formsActions;

//   dispatch(getForms());

//   expect(dispatchSpy).toHaveBeenCalled();
//   expect(dispatchSpy).toHaveBeenCalledWith({});
// });

// test("test", async () => {
//   const getFormsSpy = jest.spyOn(formsActions, "getForms");

//   const dispatch = store.dispatch;
//   dispatch(formsActions.getForms());

//   expect(getFormsSpy).toHaveBeenCalled();
// });
