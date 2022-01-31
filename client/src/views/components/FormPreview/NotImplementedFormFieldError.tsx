import React, { FunctionComponent } from 'react';
import { FormFieldStrategyProps } from './Types';
import { Typography } from '@mui/material';

export const NotImplementedFormFieldError: FunctionComponent<FormFieldStrategyProps> = ({}) => {
  return (
    <Typography variant='subtitle1'>
      <b>Error!! This form field type is not implemented!</b>
    </Typography>
  );
};
