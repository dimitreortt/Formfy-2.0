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
  } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formFieldsGateway = new FormFieldsGateway(httpClient);

  const moveFieldDown = async (index: number) => {
    moveFieldDownAction();
    try {
      awaitingMoveDown();
      await formFieldsGateway.moveFieldDown(formId, index);
      moveDownSuccess();
    } catch (error) {
      moveDownFail();
    }
  };

  return { moveFieldDown };
};
