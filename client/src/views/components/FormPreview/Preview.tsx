import React, { FunctionComponent, useState, useEffect } from 'react';
import { IForm } from '../../../domain/Form';
import { IFormField, FormFieldValue } from '../../../domain/FormField';
import { RenderFormField } from './RenderFormField';
import { Card, Box } from '@mui/material';

type Props = {
  form: IForm | undefined;
};

const makeInitialFormState = (formFields: IFormField[]) => {
  let state: any = {};
  for (const field of formFields) {
    state[field.label] = '';
  }
  return state;
};

export const Preview: FunctionComponent<Props> = ({ form }) => {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    if (!form) return;
    setState(makeInitialFormState(form.fields));
  }, [form]);

  const onChange = (label: string, value: FormFieldValue) => {
    setState({ ...state, [label]: value });

    console.log(state);
  };

  return (
    <Card sx={{ width: '400px', padding: '10px' }}>
      {!form ? (
        <div>No form to preview</div>
      ) : (
        <div>
          <div>
            <b>{form.name}</b>
          </div>
          {form.fields.map((field: IFormField) => {
            return (
              <Box sx={{ mb: '10px' }} key={field.id}>
                {/* <div>
                  <b>{field.label}</b>
                </div> */}
                <RenderFormField field={field} onChange={onChange} />
              </Box>
            );
          })}
        </div>
      )}
    </Card>
  );
};
