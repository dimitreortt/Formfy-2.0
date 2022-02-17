import React, { FunctionComponent, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SetFieldDialog } from "./SetFieldDialog";
import { FormFieldType, IFormField } from "../../../domain/FormField";
import { AlertSnackbar } from "./AlertSnackbar";
import { NewFieldParams } from "./AddField";
import { useEditField } from "../../../application/usecase/useEditField";

type Props = {
  formId: number;
  field: IFormField;
  open: boolean;
  toggleOpen: () => void;
};

export const EditField: FunctionComponent<Props> = ({
  formId,
  field,
  open,
  toggleOpen,
}) => {
  const [error, setError] = useState();

  const { editField } = useEditField(formId);

  const onSetFieldSubmit = async (newFieldData: NewFieldParams) => {
    const error = await editField(field, newFieldData);
    if (error) setError(error);
  };

  return (
    <div>
      <SetFieldDialog
        onClose={toggleOpen}
        open={open}
        onSetFieldSubmit={onSetFieldSubmit}
        initialField={field}
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
