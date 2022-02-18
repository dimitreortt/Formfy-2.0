import React, { useEffect } from 'react';
import { FormFieldsManageTable } from '../components/FormFieldsManageTable/FormFieldsManageTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../application/store/configureStore';
import { useGetForms } from '../../application/usecase/useGetForms';

export const FillFormPage = () => {
  const forms = useSelector((state: RootState) => state.forms.forms);
  const { getForms } = useGetForms();

  useEffect(() => {
    if (forms !== 'not_initialized') return;
    getForms();
  }, []);

  return (
    <div>
      <FormFieldsManageTable />
    </div>
  );
};
