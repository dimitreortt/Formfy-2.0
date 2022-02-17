import { useActions } from "./../hooks/useActions";

export const useDeleteField = (formId: number) => {
  const { deleteField: deleteFieldAction, awaitingDeleteField } = useActions();

  const deleteField = async () => {
    deleteFieldAction();
    try {
      awaitingDeleteField();
    } catch (error) {}
  };

  return { deleteField };
};
