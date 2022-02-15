import React, { FunctionComponent } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";

type Props = {
  options: string[];
};

export const FieldOptionsList: FunctionComponent<Props> = ({ options }) => {
  return (
    <Box>
      {options.map((option) => (
        <Box key={option} sx={{ border: 0.1, padding: 0.5 }}>
          {option}
          <Button
            data-testid="remove-option-button"
            variant="contained"
            color="primary"
          >
            remove
          </Button>
        </Box>
      ))}
    </Box>
  );
};
