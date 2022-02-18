import React from "react";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export const CloseAddOptionButton = ({ onClick }: any) => {
  return (
    <IconButton
      sx={{
        display: "inline-block",
        py: 0.2,
        px: 0.7,
        minHeight: 0,
        minWidth: 0,
      }}
      role="close-add-option"
      aria-describedby={"add-field-option"}
      color="secondary"
      onClick={onClick}
    >
      <CancelIcon />
    </IconButton>
  );
};
