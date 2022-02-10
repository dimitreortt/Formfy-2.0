import React, { useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import {
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { FormFieldType } from "../../../domain/FormField";
import { Box } from "@mui/system";

const typeOptions: FormFieldType[] = [
  "Short Text",
  "Long Text",
  "Date",
  "Date and Time",
  "CPF",
  "CNPJ",
  "List Selection",
  "Checkbox",
  "Phone Number",
];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const SetFieldDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;

  const [type, setType] = useState("");
  const [label, setLabel] = useState("");
  const [newFieldOption, setNewFieldOption] = useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
    >
      <DialogTitle sx={{ backgroundColor: "transparent" }}>
        Field Setup
      </DialogTitle>
      {/* <div>Field Setup</div> */}
      <DialogContent
        sx={{
          "& *": {
            mb: 0.7,
          },
        }}
      >
        {/* <TextField
          sx={{ mt: 0.7 }}
          id="set-field-label"
          label="Label"
          value={label}
          onChange={handleLabelChange}
          fullWidth
        /> */}
        <FormControl sx={{ m: 0, minWidth: 220 }} fullWidth>
          <InputLabel id="select-label">Type</InputLabel>
          <Select
            labelId="select-label"
            id="select-id"
            value={type}
            label={"Type"}
            onChange={handleTypeChange}
            fullWidth
          >
            {typeOptions &&
              typeOptions.map((option: string) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        {/* {(type === "List Selection" || type === "Checkbox") && (
          <Box>
            <div>adder de options</div>
            <IconButton
              aria-describedby={"add-field-option"}
              color="secondary"
              // onClick={toggleOpen}
            >
              <AddIcon />
            </IconButton>
          </Box>
        )} */}
      </DialogContent>
    </Dialog>
  );
};
