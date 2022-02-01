import React, { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormFieldStrategyProps } from './Types';
import { isValidPhoneNumber } from './utils/isValidPhoneNumber';

export const PhoneNumberFormField: FunctionComponent<FormFieldStrategyProps> = ({
  label,
  onChange,
}) => {
  const [helperText, setHelperText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isValidPhoneNumber(value)) setHelperText('');
    onChange(label, value);
  };

  const handleLoseFocus = (event: any) => {
    const value = event.target.value;
    if (!isValidPhoneNumber(value)) {
      setHelperText('Invalid phone number');
    }
  };

  return (
    <TextField
      helperText={helperText}
      error={!!helperText}
      label={label}
      onChange={handleChange}
      variant='outlined'
      onBlur={handleLoseFocus}
      fullWidth
    />
  );
};
