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
import CancelIcon from "@mui/icons-material/Cancel";

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
  const [newFieldOptions, setNewFieldOptions] = useState<string[]>([]);
  const [onAddFieldOption, setOnAddFieldOption] = useState(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleNewFieldOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewFieldOption(event.target.value);
  };

  const handleNewFieldOptionAdded = (option: string) => {
    if (!option) return;
    const temp = [...newFieldOptions];
    temp.push(option);
    const unique = [...new Set(temp)];
    setNewFieldOptions(unique);
    setNewFieldOption("");
  };

  console.log(newFieldOptions);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
    >
      <DialogTitle sx={{ backgroundColor: "transparent", border: 0.1, m: 0.3 }}>
        Field Setup
      </DialogTitle>
      {/* <div>Field Setup</div> */}
      <DialogContent
        sx={{
          "& *": {
            // mb: 0.7,
          },
        }}
      >
        <TextField
          sx={{ mt: 0.7 }}
          id="set-field-label"
          label="Label"
          value={label}
          onChange={handleLabelChange}
          fullWidth
        />
        <FormControl sx={{ m: 0, minWidth: 220, mt: 1 }} fullWidth>
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
        {(type === "List Selection" || type === "Checkbox") && (
          <Box sx={{ mt: 1 }}>
            {/* <Box>
              {newFieldOptions.map((option) => (
                <Box key={option} sx={{ border: 0.1, padding: 0.5 }}>
                  {option}
                </Box>
              ))}
            </Box> */}
            {onAddFieldOption && (
              <Box>
                <TextField
                  sx={{ mt: 0.7, border: 0.0, mb: 0, pb: 0 }}
                  id="add-field-option"
                  label="Option"
                  value={newFieldOption}
                  onChange={handleNewFieldOptionChange}
                  fullWidth
                />
              </Box>
            )}
            <Box sx={{ display: "flex" }}>
              {onAddFieldOption && (
                <Box sx={{ flexGrow: 1 }}>
                  <Button
                    sx={{
                      display: "inline-block",
                      py: 0.2,
                      px: 0.7,
                      minHeight: 0,
                      minWidth: 0,
                    }}
                    onClick={() => handleNewFieldOptionAdded(newFieldOption)}
                  >
                    Confirm
                  </Button>
                </Box>
              )}
              <IconButton
                sx={{
                  display: "inline-block",
                  py: 0.2,
                  px: 0.7,
                  minHeight: 0,
                  minWidth: 0,
                }}
                aria-describedby={"add-field-option"}
                color="secondary"
                onClick={() => setOnAddFieldOption((prev) => !prev)}
              >
                {onAddFieldOption ? <CancelIcon /> : <AddIcon />}
              </IconButton>
            </Box>
          </Box>
        )}
      </DialogContent>
      {/* <DialogContent
        sx={{
          "& *": {
            mb: 0.7,
          },
        }}
      ></DialogContent> */}
    </Dialog>
  );
};
