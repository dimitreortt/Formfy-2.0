import React, { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import { IFormField } from "../../../domain/FormField";
import { useDeleteField } from "../../../application/usecase/useDeleteField";

type Props = {
  field: IFormField;
  formId: number;
};

export const DeleteField: FunctionComponent<Props> = ({ field, formId }) => {
  const { deleteField } = useDeleteField(formId);

  const onDeleteConfirm = async () => {
    await deleteField(field);
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
    </div>
  );
};
