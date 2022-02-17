import React, { FunctionComponent, useState } from "react";
import Button from "@mui/material/Button";
import { IFormField } from "../../../domain/FormField";
import { useDeleteField } from "../../../application/usecase/useDeleteField";
import { AlertSnackbar } from "./AlertSnackbar";

type Props = {
  field: IFormField;
  formId: number;
};

export const DeleteField: FunctionComponent<Props> = ({ field, formId }) => {
  const { deleteField } = useDeleteField(formId);
  const [error, setError] = useState<string>();

  const onDeleteConfirm = async () => {
    const error = await deleteField(field);
    console.log(error);
    if (error) setError(error);
  };

  return (
    <div>
      Confirm deletion?
      <Button
        variant="contained"
        color="error"
        data-testid="confirm-delete-button"
        onClick={onDeleteConfirm}
      >
        Confirm
      </Button>
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
