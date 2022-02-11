import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SetFieldDialog } from "../views/pages/FillForm/SetFieldDialog";

test("Should call function on submit", async () => {
  const submitFn = jest.fn();

  render(
    <SetFieldDialog
      open={true}
      onClose={() => {}}
      onSetFieldSubmit={submitFn}
    />
  );

  fireEvent.click(screen.getByRole("submit-button"));

  expect(submitFn).toHaveBeenCalled();
});

test("Should display error when submiting without correct arguments", async () => {
  //   render(<SetFieldDialog />);
});
