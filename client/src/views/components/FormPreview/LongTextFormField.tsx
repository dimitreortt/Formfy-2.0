import React, { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import { FormFieldStrategyProps } from './Types';

export const LongTextFormField: FunctionComponent<FormFieldStrategyProps> = ({
  label,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      multiline
      rows={4}
      onChange={(e) => onChange(label, e.target.value)}
      variant='outlined'
      fullWidth
    />
  );
};
