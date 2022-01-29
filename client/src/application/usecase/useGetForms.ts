import { FormsAssembler } from '../service/FormsAssembler';
import { ApplicationContext } from '../contexts/ApplicationContext';
import { useContext } from 'react';
import { FormsGateway } from '../../infra/api/FormsGateway';
import { useActions } from '../hooks/useActions';

export const useGetForms = () => {
  const {
    getForms: getFormsAction,
    loadFormsSuccess,
    setForms,
    loadFormsFail,
    loadingForms,
  } = useActions();

  const { httpClient } = useContext(ApplicationContext);
  const formsGateway = new FormsGateway(httpClient);

  const getForms = async () => {
    getFormsAction();
    try {
      loadingForms();
      const response = await formsGateway.getForms();
      const forms = FormsAssembler.assembly(response);
      loadFormsSuccess();
      setForms(forms);
    } catch (error) {
      loadFormsFail();
    }
  };

  return { getForms };
};
