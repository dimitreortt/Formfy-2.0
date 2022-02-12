import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import { SetFieldDialog } from "../views/pages/FillForm/SetFieldDialog";

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

test("Should call function given function on submit", async () => {
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
});
