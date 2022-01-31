import React, { FunctionComponent } from 'react';
import { FormFieldType, IFormField } from '../../../domain/FormField';

type ChildProps = { type: FormFieldType; label: string; onChange: any };

type Props = {
  strategyComponent: FunctionComponent<ChildProps>;
  field: IFormField;
  onChange: any;
};

export const RenderStrategy: FunctionComponent<Props> = ({
  strategyComponent: Component,
  field,
  onChange,
}) => {
  return <Component label={field.label} type={field.type} onChange={onChange} />;
};
