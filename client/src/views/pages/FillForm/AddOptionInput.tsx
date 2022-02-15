import React, { FunctionComponent } from "react";
import { TextField } from "@mui/material";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddOptionInput: FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  return (
    <TextField
      sx={{ mt: 0.7 }}
      // InputLabelProps={{ shrink: true }}
      inputProps={{ "data-testid": "add-option-input" }}
      label="Option"
      size="small"
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
};
