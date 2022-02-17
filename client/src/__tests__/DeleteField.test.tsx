import React from "react";
import { DeleteField } from "../views/pages/FillForm/DeleteField";
import { render } from "../__testsUtils/renderWithStore";

const setup = () => {
  render(<DeleteField />);
};

test("Should render correctly", async () => {
  setup();
});
