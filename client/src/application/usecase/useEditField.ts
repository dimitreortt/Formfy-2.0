import { IFormField } from './../../domain/entities/FormField';
import { NewFieldParams } from '../../views/components/FormFieldsManageTable/AddField';
import { FormFieldsGateway } from './../../infra/api/FormFieldsGateway';
import { ApplicationContext } from './../contexts/ApplicationContext';
import { useContext } from 'react';
import { useActions } from './../hooks/useActions';

export const useEditField = (formId: number) => {
  const {
    editField: editFieldAction,
    awaitingEditField,
    ratifyEditedField,
    editFieldSuccess,
    editFieldFail,
  } = useActions();
  const { httpClient } = useContext(ApplicationContext);
  const formFieldsGateway = new FormFieldsGateway(httpClient);

  const editField = async (field: IFormField, newData: NewFieldParams) => {
    editFieldAction();
    try {
      awaitingEditField();
      await formFieldsGateway.updateFormField(formId, field, newData);
      editFieldSuccess();
      ratifyEditedField([formId, field, newData]);
    } catch (error: any) {
      editFieldFail();
      return error.message;
    }
  };

  return { editField };
};
