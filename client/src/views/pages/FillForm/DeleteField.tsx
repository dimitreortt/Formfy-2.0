import React, { FunctionComponent, useState } from "react";
import Button from "@mui/material/Button";
import { IFormField } from "../../../domain/FormField";
import { useDeleteField } from "../../../application/usecase/useDeleteField";
import { AlertSnackbar } from "./AlertSnackbar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Props = {
  field: IFormField;
  formId: number;
  onCancelDelete: () => void;
  inDeleteField: boolean;
};

export const DeleteField: FunctionComponent<Props> = ({
  field,
  formId,
  onCancelDelete,
  inDeleteField,
}) => {
  const { deleteField } = useDeleteField(formId);
  const [error, setError] = useState<string>();

  const onDeleteConfirm = async () => {
    const error = await deleteField(field);
    if (error) setError(error);
  };

  const onAlertClose = () => {
    setError(undefined);
    onCancelDelete();
  };

  return (
    <Dialog open={inDeleteField}>
      <DialogTitle>Confirm deletion?</DialogTitle>
      {/* <DialogContent></DialogContent> */}
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          data-testid="confirm-delete-button"
          onClick={onDeleteConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity="warning">
        {error}
      </AlertSnackbar>
    </Dialog>
  );
};
