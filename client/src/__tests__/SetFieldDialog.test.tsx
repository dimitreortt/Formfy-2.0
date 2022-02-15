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

test("Should call given function on submit with correct parameters", async () => {
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
  const typeSelectionInput = screen.getByLabelText("Type");
  fireEvent.mouseDown(typeSelectionInput);
  fireEvent.click(screen.getByText("List Selection"));
  fireEvent.click(screen.getByRole("add-option-button"));
  expect(screen.queryByRole("add-option-button")).not.toBeInTheDocument();
  expect(screen.getByRole("close-add-option")).toBeInTheDocument();
});

test("Should render an input field when in 'add option' mode", async () => {
  setup();
  const typeSelectionInput = screen.getByLabelText("Type");
  fireEvent.mouseDown(typeSelectionInput);
  fireEvent.click(screen.getByText("List Selection"));
  expect(screen.queryByTestId("add-option-input")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("add-option-button"));
  expect(screen.getByTestId("add-option-input")).toBeInTheDocument();
});

test("Should render a button to submit option input, it should be disabled if input is empty", async () => {
  setup();
  const typeSelectionInput = screen.getByLabelText("Type");
  fireEvent.mouseDown(typeSelectionInput);
  fireEvent.click(screen.getByText("List Selection"));
  fireEvent.click(screen.getByRole("add-option-button"));

  expect(screen.getByRole("submit-option-button")).toBeInTheDocument();
  expect(screen.getByRole("submit-option-button")).toHaveClass("Mui-disabled");

  fireEvent.change(screen.getByTestId("add-option-input"), {
    target: { value: "Sedan" },
  });
  expect(screen.getByRole("submit-option-button")).not.toHaveClass(
    "Mui-disabled"
  );
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
  const labelInput = screen.getByLabelText("Label");
  const typeSelectInput = screen.getByTestId("select-type");
  expect(labelInput.value).toBe("Factory Number");
  expect(typeSelectInput.value).toBe("Short Text");
});

test("Should display list selection options", async () => {
  const initialField: NewFieldParams = {
    label: "Category",
    type: "List Selection",
    options: ["Sedan", "Coupe", "Sports Car"],
  };
  render(
    <SetFieldDialog
      open={true}
      onClose={() => {}}
      onSetFieldSubmit={() => {}}
      initialField={initialField}
    />
  );

  expect(screen.getByText("Sedan")).toBeInTheDocument();
  expect(screen.getByText("Coupe")).toBeInTheDocument();
  expect(screen.getByText("Sports Car")).toBeInTheDocument();
});

test("Should display added option", async () => {
  const initialField: NewFieldParams = {
    label: "Category",
    type: "List Selection",
    options: ["Sedan"],
  };
  render(
    <SetFieldDialog
      open={true}
      onClose={() => {}}
      onSetFieldSubmit={() => {}}
      initialField={initialField}
    />
  );

  fireEvent.click(screen.getByRole("add-option-button"));
  fireEvent.change(screen.getByTestId("add-option-input"), {
    target: { value: "Coupe" },
  });
  fireEvent.click(screen.getByRole("submit-option-button"));

  expect(screen.getByText("Sedan")).toBeInTheDocument();
  expect(screen.getByText("Coupe")).toBeInTheDocument();
});
