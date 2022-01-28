import { FormsAssembler } from '../service/FormsAssembler';
import { ApplicationContext } from '../contexts/ApplicationContext';
import { useContext } from 'react';
import { FormsGateway } from '../../infra/api/FormsGateway';
import { useActions } from '../hooks/useActions';

export const useGetForms = () => {
  const {
    getForms: getFormsAction,
    setLoadFormsSuccess,
    setForms,
    setLoadFormsFail,
  } = useActions();

  const { httpClient } = useContext(ApplicationContext);
  const formsGateway = new FormsGateway(httpClient);

  const getForms = async () => {
    getFormsAction();
    try {
      const response = await formsGateway.getForms();
      const forms = FormsAssembler.assembly(response);
      setLoadFormsSuccess();
      setForms(forms);
    } catch (error) {
      setLoadFormsFail();
    }
  };

  return { getForms };
};
