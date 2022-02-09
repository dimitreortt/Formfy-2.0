import { FormFieldsGateway } from "./../../infra/api/FormFieldsGateway";
import { FormsAssembler } from "../service/FormsAssembler";
import { ApplicationContext } from "../contexts/ApplicationContext";
import { useContext } from "react";
import { FormsGateway } from "../../infra/api/FormsGateway";
import { useActions } from "../hooks/useActions";

export const useMoveFieldDown = (formId: number) => {
  const {
    moveFieldDown: moveFieldDownAction,
    awaitingMoveDown,
    moveDownSuccess,
    moveDownFail,
    swapFieldsIndexes,
  } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formFieldsGateway = new FormFieldsGateway(httpClient);

  const moveFieldDown = async (fieldIndex: number) => {
    moveFieldDownAction();
    try {
      awaitingMoveDown();
      await formFieldsGateway.moveFieldDown(formId, fieldIndex);
      moveDownSuccess();
      swapFieldsIndexes([formId, fieldIndex, fieldIndex + 1]);
    } catch (error) {
      moveDownFail();
    }
  };

  return { moveFieldDown };
};
