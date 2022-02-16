import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { EditField } from "../views/pages/FillForm/EditField";
import { NewFieldParams } from "../views/pages/FillForm/AddField";
import { IFormField } from "../domain/FormField";
import { render } from "../__testsUtils/testUtils";
import * as editFieldUsecase from "../application/usecase/useEditField";

const setup = () => {
  const initialField: IFormField = {
    label: "Category",
    type: "List Selection",
    options: ["Sedan", "Coupe"],
    id: 1,
    index: 0,
  };
  render(
    <EditField
      formId={1}
      field={initialField}
      open={true}
      toggleOpen={() => {}}
    />
  );
};

test("Should render correctly and render the component responsible for setting the field", async () => {
  setup();
  expect(screen.getByText("Field Setup")).toBeInTheDocument();
});

test("Should call EditField usecase on set field submit", async () => {
  const editFieldMock = jest.fn();
  const spy = jest.spyOn(editFieldUsecase, "useEditField").mockReturnValue({
    editField: editFieldMock,
  });
  setup();
  expect(editFieldMock).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("submit-button"));
  expect(editFieldMock).toHaveBeenCalled();

  spy.mockRestore();
});
