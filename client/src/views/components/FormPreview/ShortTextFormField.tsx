import React, { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import { FormFieldStrategyProps } from './Types';

export const ShortTextFormField: FunctionComponent<FormFieldStrategyProps> = ({
  label,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      variant='outlined'
      onChange={(e) => onChange(label, e.target.value)}
      fullWidth
    />
  );
};
