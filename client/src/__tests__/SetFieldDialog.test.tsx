import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import { SetFieldDialog } from "../views/pages/FillForm/SetFieldDialog";
import { NewFieldParams } from "../views/pages/FillForm/AddField";

const setup = () => {
  const submitFn = jest.fn();

  const utils = render(
    <SetFieldDialog
      open={true}
      onClose={() => {}}
      onSetFieldSubmit={submitFn}
    />
  );

  return { submitFn, utils };
};

test("Should display error when submiting without correct label argument", async () => {
  setup();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  fireEvent.mouseDown(screen.getByLabelText("Type"));
  fireEvent.click(screen.getByText("Short Text"));
  fireEvent.click(screen.getByRole("submit-button"));
  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(
    screen.getByText("Type and label cannot be empty!")
  ).toBeInTheDocument();
});

test("Should display error when submiting without correct type argument", async () => {
  setup();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Label"), {
    target: { value: "Name" },
  });
  fireEvent.click(screen.getByRole("submit-button"));
  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(
    screen.getByText("Type and label cannot be empty!")
  ).toBeInTheDocument();
});

test("Should call function given function on submit with correct parameters", async () => {
  const { submitFn, utils } = setup();
  const labelInput = screen.getByLabelText("Label");
  fireEvent.change(labelInput, { target: { value: "Name" } });
  const typeSelectionInput = screen.getByLabelText("Type");
  // const typeSelectionInput = screen.getByTestId("ArrowDropDownIcon");
  fireEvent.mouseDown(typeSelectionInput);
  // expect(typeSelectionInput).toBeInTheDocument();

  // const listboxElement = screen.getByRole("listbox");
  // expect(listboxElement).toBeInTheDocument();

  // const listbox = within(listboxElement);

  // expect(listbox.getByText("Short Text")).toBeInTheDocument();
  expect(screen.getByText("Short Text")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Short Text"));

  // expect(screen.getByText("Short Text")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("submit-button"));
  expect(submitFn).toHaveBeenCalled();
  expect(submitFn).toHaveBeenCalledWith({
    label: "Name",
    type: "Short Text",
    options: [],
  });
});

test("Should render a button to add option when type selected is List Selection", async () => {
  setup();
  expect(screen.queryByRole("add-option-button")).not.toBeInTheDocument();
  const typeSelectionInput = screen.getByLabelText("Type");
  fireEvent.mouseDown(typeSelectionInput);
  fireEvent.click(screen.getByText("List Selection"));
  expect(screen.getByRole("add-option-button")).toBeInTheDocument();
  expect(screen.queryByRole("close-add-option")).not.toBeInTheDocument();
});

test("Should render a button to close add option when this mode is on", async () => {
  setup();
  expect(screen.queryByRole("add-option-button")).not.toBeInTheDocument();
  const typeSelectionInput = screen.getByLabelText("Type");
  fireEvent.mouseDown(typeSelectionInput);
  fireEvent.click(screen.getByText("List Selection"));
  fireEvent.click(screen.getByRole("add-option-button"));
  expect(screen.queryByRole("add-option-button")).not.toBeInTheDocument();
  expect(screen.getByRole("close-add-option")).toBeInTheDocument();
});

test("Should display initial values when initial field is provided, used in edit mode", async () => {
  const submitFn = jest.fn();
  const initialField: NewFieldParams = {
    label: "Factory Number",
    type: "Short Text",
  };
  const utils = render(
    <SetFieldDialog
      open={true}
      onClose={() => {}}
      onSetFieldSubmit={submitFn}
      initialField={initialField}
    />
  );
  const input = screen.getByLabelText("Label");
  expect(input.value).toBe("Factory Number");
});
