import React, { FunctionComponent, useState } from 'react';
import { IFormField, FormFieldValue } from '../../../domain/FormField';
import { RenderStrategy } from './RenderStrategy';
import { ShortTextFormField } from './ShortTextFormField';
import { LongTextFormField } from './LongTextFormField';
import { DateFormField } from './DateFormField';
import { EmailFormField } from './EmailFormField';
import { CheckboxFormField } from './CheckboxFormField';
import { ListSelectionFormField } from './ListSelectionFormField';
import { DateAndTimeFormField } from './DateAndTimeFormField';
import { PhoneNumberFormField } from './PhoneNumberFormField';
import { CPFFormField } from './CPFFormField';
import { CNPJFormField } from './CNPJFormField';
import { NotImplementedFormFieldError } from './NotImplementedFormFieldError';

type Props = {
  field: IFormField;
  onChange: (label: string, value: FormFieldValue) => void;
};

export const RenderFormField: FunctionComponent<Props> = ({ field, onChange }) => {
  const [state, setState] = useState<any>({});

  // const onChange = (label: string, value: FormFieldValue) => {
  //   setState({ ...state, [label]: value });

  //   console.log(state);
  // };

  const getStrategyComponent = (type: string) => {
    switch (type) {
      case 'Short Text':
        return ShortTextFormField;
      case 'Long Text':
        return LongTextFormField;
      case 'Date':
        return DateFormField;
      case 'Date and Time':
        return DateAndTimeFormField;
      case 'Email':
        return EmailFormField;
      case 'Checkbox':
        return CheckboxFormField;
      case 'List Selection':
        return ListSelectionFormField;
      case 'Phone Number':
        return PhoneNumberFormField;
      case 'CPF':
        return CPFFormField;
      case 'CNPJ':
        return CNPJFormField;
      default:
        return NotImplementedFormFieldError;
    }
  };

  return (
    <RenderStrategy
      strategyComponent={getStrategyComponent(field.type)}
      field={field}
      onChange={onChange}
    />
  );
};
