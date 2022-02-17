import React from "react";
import { DeleteField } from "../views/pages/FillForm/DeleteField";
import { render } from "../__testsUtils/renderWithStore";
import * as useDeleteFieldModule from "../application/usecase/useDeleteField";
import { fireEvent, screen } from "@testing-library/react";

const setup = () => {
  render(<DeleteField />);
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

// test("Should call DeleteField usecase on delete confirm", async () => {
//   const deleteFieldMock = jest.fn();
//   const spy = jest
//     .spyOn(useDeleteFieldModule, "useDeleteField")
//     .mockReturnValue({
//       deleteField: deleteFieldMock,
//     });
//   setup();
//   expect(deleteFieldMock).not.toHaveBeenCalled();
//   fireEvent.click(screen.getByTestId("confirm-delete-button"));
//   expect(deleteFieldMock).toHaveBeenCalled();
//   spy.mockRestore();
// });
