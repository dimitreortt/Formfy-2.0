import React, { FunctionComponent } from 'react';
import { IForm } from '../../../domain/Form';
import { IFormField } from '../../../domain/FormField';

type Props = {
  form: IForm;
};

export const Preview: FunctionComponent<Props> = ({ form }) => {
  return (
    <div>
      <b>{form.name}</b>
      {form.fields.map((field: IFormField) => {
        return <b>{field.label}</b>;
      })}
    </div>
  );
};
