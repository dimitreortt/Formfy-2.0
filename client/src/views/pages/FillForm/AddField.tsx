import React, { FunctionComponent, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SetFieldDialog } from "./SetFieldDialog";
import { FormFieldType, IFormField } from "../../../domain/FormField";
import { useAddField } from "../../../application/usecase/useAddField";
import { AlertSnackbar } from "./AlertSnackbar";

type Props = {
  formId: number;
};

export type NewFieldParams = Pick<IFormField, "label" | "type" | "options">;

export const AddField: FunctionComponent<Props> = ({ formId }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  const toggleOpen = () => setOpen((prev) => !prev);
  const { addField } = useAddField(formId);

  const onSetFieldSubmit = async (field: NewFieldParams) => {
    const error = await addField(field);
    if (error) setError(error);
    //  alert(error);
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
        onSetFieldSubmit={onSetFieldSubmit}
      />
      <AlertSnackbar
        open={!!error}
        onClose={() => setError(undefined)}
        severity="warning"
      >
        {error}
      </AlertSnackbar>
    </div>
  );
};
