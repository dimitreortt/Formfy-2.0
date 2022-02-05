import { FormsAssembler } from '../service/FormsAssembler';
import { ApplicationContext } from '../contexts/ApplicationContext';
import { useContext } from 'react';
import { FormsGateway } from '../../infra/api/FormsGateway';
import { useActions } from '../hooks/useActions';

export const useMoveFieldUp = () => {
  const {} = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formsGateway = new FormsGateway(httpClient);

  const moveFieldUp = () => {};

  return { moveFieldUp };
};
