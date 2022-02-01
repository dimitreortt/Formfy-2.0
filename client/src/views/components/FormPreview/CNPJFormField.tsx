import React, { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormFieldStrategyProps } from './Types';
import { isValidCNPJ } from './utils/isValidCNPJ';

export const CNPJFormField: FunctionComponent<FormFieldStrategyProps> = ({ label, onChange }) => {
  const [helperText, setHelperText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (helperText) setHelperText('');
    onChange(label, value);
  };

  const handleLoseFocus = (event: any) => {
    const value = event.target.value;
    if (!isValidCNPJ(value)) {
      setHelperText('Invalid CNPJ');
    }
  };

  return (
    <TextField
      label={label}
      variant='outlined'
      onChange={handleChange}
      helperText={helperText}
      error={!!helperText}
      onBlur={handleLoseFocus}
    />
  );
};
