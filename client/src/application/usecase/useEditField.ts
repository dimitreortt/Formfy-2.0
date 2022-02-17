import { useActions } from "./../hooks/useActions";

export const useEditField = (formId: number) => {
  const { editField: editFieldAction, awaitingEditField } = useActions();

  const editField = () => {
    editFieldAction();
    try {
      awaitingEditField();
      const value: any = "";
      return value;
    } catch (error: any) {
      return error.message;
    }
  };

  return { editField };
};
