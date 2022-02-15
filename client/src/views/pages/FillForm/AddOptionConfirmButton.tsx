import React from "react";
import { Button } from "@mui/material";

export const AddOptionConfirmButton = ({ disabled, onClick }: any) => {
  return (
    <Button
      sx={{
        display: "inline-block",
        py: 0.2,
        px: 0.7,
        minHeight: 0,
        minWidth: 0,
      }}
      role="submit-option-button"
      onClick={onClick}
      disabled={disabled}
    >
      Confirm
    </Button>
  );
};
