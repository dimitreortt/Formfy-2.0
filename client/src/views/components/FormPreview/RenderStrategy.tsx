import React, { FunctionComponent } from 'react';
import { FormFieldType, IFormField, FormFieldValue } from '../../../domain/FormField';
import { FormFieldStrategyProps } from './Types';

type Props = {
  strategyComponent: FunctionComponent<FormFieldStrategyProps>;
  field: IFormField;
  onChange: (label: string, value: FormFieldValue) => void;
};

export const RenderStrategy: FunctionComponent<Props> = ({
  strategyComponent: Component,
  field,
  onChange,
}) => {
  return <Component label={field.label} options={field.options} onChange={onChange} />;
};
