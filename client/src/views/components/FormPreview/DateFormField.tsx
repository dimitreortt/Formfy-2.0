import React, { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { FormFieldStrategyProps } from './Types';

export const DateFormField: FunctionComponent<FormFieldStrategyProps> = ({ label, onChange }) => {
  // const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={new Date()}
        onChange={(newValue) => {
          onChange(label, newValue ? newValue : new Date());
        }}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};
