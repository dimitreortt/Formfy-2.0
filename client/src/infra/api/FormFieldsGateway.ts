import { NewFieldParams } from '../../views/components/FormFieldsManageTable/AddField';
import { FormFieldType, IFormField } from './../../domain/entities/FormField';
import HttpClient from '../http/HttpClient';

// type UpdateFormFieldParams = {
//   label: string;
//   formId: number;
//   newType: FormFieldType;
//   newLabel: string;
//   newOptions: string[];
// };

export class FormFieldsGateway {
  serverBaseUrl = 'http://localhost:4000';
  constructor(readonly httpClient: HttpClient) {}

  add(formId: number, field: Pick<IFormField, 'label' | 'type' | 'options'>) {
    const data = {
      formId,
      type: field.type,
      label: field.label,
      options: field.options,
    };
    const url = `${this.serverBaseUrl}/formField`;
    return this.httpClient.request(url, 'POST', data);
  }

  updateFormField(
    formId: number,
    oldField: IFormField,
    newData: NewFieldParams
  ) {
    const data = {
      formId,
      fieldLabel: oldField.label,
      newIndex: oldField.index,
      newType: newData.type,
      newLabel: newData.label,
      newOptions: newData.options,
    };
    const url = `${this.serverBaseUrl}/formField`;
    return this.httpClient.request(url, 'PATCH', data);
  }

  deleteFormField(formId: number, fieldLabel: string) {
    const url = `${this.serverBaseUrl}/formField`;
    const data = {
      formId,
      fieldLabel,
    };
    return this.httpClient.request(url, 'DELETE', data);
  }

  moveFieldUp(formId: number, index: number) {
    const url = `${this.serverBaseUrl}/formField/moveUp`;
    const data = {
      formId,
      index,
    };
    return this.httpClient.request(url, 'PATCH', data);
  }

  moveFieldDown(formId: number, index: number) {
    const url = `${this.serverBaseUrl}/formField/moveDown`;
    const data = {
      formId,
      index,
    };
    return this.httpClient.request(url, 'PATCH', data);
  }
}
