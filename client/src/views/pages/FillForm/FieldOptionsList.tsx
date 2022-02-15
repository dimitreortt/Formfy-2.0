import React, { FunctionComponent } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";

type Props = {
  options: string[];
  onRemove: (option: string) => void;
};

export const FieldOptionsList: FunctionComponent<Props> = ({
  options,
  onRemove,
}) => {
  return (
    <Box>
      {options.map((option) => (
        <Box key={option} sx={{ border: 0.1, padding: 0.5 }}>
          {option}
          <Button
            data-testid="remove-option-button"
            variant="contained"
            color="primary"
            onClick={() => onRemove(option)}
          >
            remove
          </Button>
        </Box>
      ))}
    </Box>
  );
};
