import React, { FunctionComponent } from 'react';
import { IForm } from '../../../domain/Form';
import { IFormField } from '../../../domain/FormField';
import { RenderFormField } from './RenderFormField';

type Props = {
  form: IForm | undefined;
};

export const Preview: FunctionComponent<Props> = ({ form }) => {
  return (
    <div>
      {!form ? (
        <div>No form to preview</div>
      ) : (
        <div>
          <div>
            <b>{form.name}</b>
          </div>
          {form.fields.map((field: IFormField) => {
            return (
              <div key={field.id}>
                <b>{field.label}</b>
                <RenderFormField field={field} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
