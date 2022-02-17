import React from "react";
import { DeleteField } from "../views/pages/FillForm/DeleteField";
import { render } from "../__testsUtils/renderWithStore";
import * as useDeleteFieldModule from "../application/usecase/useDeleteField";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

const setup = () => {
  const fakeField: any = {};
  const fakeFormId: any = 0;
  render(<DeleteField formId={fakeFormId} field={fakeField} />);
};

test("Should render correctly", async () => {
  setup();
});

test("Should display a confirm delete feedback", async () => {
  setup();
  expect(screen.getByText("Confirm deletion?")).toBeInTheDocument();
  expect(screen.getByTestId("confirm-delete-button")).toBeInTheDocument();
  expect(screen.getByTestId("confirm-delete-button")).toHaveTextContent(
    "Confirm"
  );
});

test("Should call DeleteField usecase on delete confirm", async () => {
  const deleteFieldMock = jest.fn();
  const spy = jest
    .spyOn(useDeleteFieldModule, "useDeleteField")
    .mockReturnValue({
      deleteField: deleteFieldMock,
    });
  setup();
  expect(deleteFieldMock).not.toHaveBeenCalled();
  fireEvent.click(screen.getByTestId("confirm-delete-button"));
  expect(deleteFieldMock).toHaveBeenCalled();
  spy.mockRestore();
});

// test("Should display success message on delete success", async () => {});

test("Should display error message on delete fail", async () => {
  const deleteFieldMock = jest.fn().mockReturnValue("Could not delete field!");
  const spy = jest
    .spyOn(useDeleteFieldModule, "useDeleteField")
    .mockReturnValue({
      deleteField: deleteFieldMock,
    });
  setup();
  fireEvent.click(screen.getByTestId("confirm-delete-button"));
  await waitFor(() => {
    expect(screen.getByText("Could not delete field!")).toBeInTheDocument();
  });
});
