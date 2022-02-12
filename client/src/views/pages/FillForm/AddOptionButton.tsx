import React from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const AddOptionButton = ({ onClick }: any) => {
  return (
    <IconButton
      sx={{
        display: "inline-block",
        py: 0.2,
        px: 0.7,
        minHeight: 0,
        minWidth: 0,
      }}
      role="add-option-button"
      aria-describedby={"add-field-option"}
      color="secondary"
      onClick={onClick}
    >
      <AddIcon />
    </IconButton>
  );
};
