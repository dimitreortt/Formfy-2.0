import { useActions } from "./../hooks/useActions";

export const useDeleteField = (formId: number) => {
  const { deleteField: deleteFieldAction } = useActions();

  const deleteField = async () => {
    deleteFieldAction();
  };

  return { deleteField };
};
