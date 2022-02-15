import React from "react";
import { screen } from "@testing-library/react";
import { EditField } from "../views/pages/FillForm/EditField";
import { NewFieldParams } from "../views/pages/FillForm/AddField";
import { IFormField } from "../domain/FormField";
import { render } from "../__testsUtils/testUtils";

test("Should render correctly and render the component responsible for setting the field", async () => {
  const initialField: IFormField = {
    label: "Category",
    type: "List Selection",
    options: ["Sedan", "Coupe"],
    id: 1,
    index: 0,
  };
  render(<EditField formId={1} field={initialField} />);
  expect(screen.getByText("Field Setup")).toBeInTheDocument();
});
