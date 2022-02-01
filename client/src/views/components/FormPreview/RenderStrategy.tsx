import React, { FunctionComponent } from 'react';
import { FormFieldType, IFormField } from '../../../domain/FormField';
import { FormFieldStrategyProps } from './Types';

type Props = {
  strategyComponent: FunctionComponent<FormFieldStrategyProps>;
  field: IFormField;
  onChange: any;
};

export const RenderStrategy: FunctionComponent<Props> = ({
  strategyComponent: Component,
  field,
  onChange,
}) => {
  return <Component label={field.label} options={field.options} onChange={onChange} />;
};
