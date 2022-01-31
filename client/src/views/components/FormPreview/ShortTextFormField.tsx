import React, { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import { FormFielStrategyProps } from './Types';

export const ShortTextFormField: FunctionComponent<FormFielStrategyProps> = ({
  label,
  onChange,
}) => {
  return (
    <TextField label={label} variant='outlined' onChange={(e) => onChange(label, e.target.value)} />
  );
};
