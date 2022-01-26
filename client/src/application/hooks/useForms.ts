import { FormsAssembler } from './../service/FormsAssembler';
import { ApplicationContext } from './../contexts/ApplicationContext';
import { FormsDAO } from '../../infra/dao/FormsDAO';
import { useActions } from '../hooks/useActions';
import { RootState } from '../store/configureStore';
import { useSelector } from 'react-redux';
import { useContext } from 'react';

export const useForms = () => {
  const { forms, loadingForms, loadFormsFail } = useSelector((state: RootState) => state.forms);
  const { setForms, setLoadingForms, setLoadFormsSuccess, setLoadFormsFail } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formsDAO = new FormsDAO(httpClient);

  if (forms === 'not_initialized' && !loadFormsFail && !loadingForms) {
    setLoadingForms();
    formsDAO
      .getForms()
      .then((response: any) => {
        console.log('aoei');
        const forms = FormsAssembler.assembly(response);
        setLoadFormsSuccess();
        setForms(forms);
      })
      .catch((error: any) => {
        console.log(error.message);
        setLoadFormsFail();
      });
  }

  return { forms, loadingForms, loadFormsFail };
};
