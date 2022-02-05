import { FormFieldsGateway } from './../../infra/api/FormFieldsGateway';
import { FormsAssembler } from '../service/FormsAssembler';
import { ApplicationContext } from '../contexts/ApplicationContext';
import { useContext } from 'react';
import { FormsGateway } from '../../infra/api/FormsGateway';
import { useActions } from '../hooks/useActions';

export const useMoveFieldUp = (formId: number) => {
  const {
    moveFieldUp: moveFieldUpAction,
    moveUpFail,
    awaitingMoveUp,
    moveUpSuccess,
  } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formFieldsGateway = new FormFieldsGateway(httpClient);

  const moveFieldUp = async (index: number) => {
    moveFieldUpAction();
    try {
      awaitingMoveUp();
      await formFieldsGateway.moveFieldUp(formId, index);
      moveUpSuccess();
    } catch (error) {
      moveUpFail();
    }
  };

  return { moveFieldUp };
};
