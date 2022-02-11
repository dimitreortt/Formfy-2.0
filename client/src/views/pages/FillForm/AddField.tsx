import React, { FunctionComponent, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SetFieldDialog } from "./SetFieldDialog";
import { FormFieldType, IFormField } from "../../../domain/FormField";
import { useAddField } from "../../../application/usecase/useAddField";

type Props = {
  formId: number;
};

export type NewFieldParams = Pick<IFormField, "label" | "type" | "options">;

export const AddField: FunctionComponent<Props> = ({ formId }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);
  const { addField } = useAddField(formId);

  const onSetFieldSubmit = async (field: NewFieldParams) => {
    const error = await addField(field);
    if (error) alert(error);
    console.log(field);
  };

  return (
    <div>
      <IconButton
        aria-describedby={"add-field-button"}
        color="secondary"
        onClick={toggleOpen}
      >
        <AddIcon />
      </IconButton>
      <SetFieldDialog
        onClose={toggleOpen}
        open={open}
        selectedValue="username@gmail.com"
        onSetFieldSubmit={onSetFieldSubmit}
      />
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}       
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover> */}
    </div>
  );
};
