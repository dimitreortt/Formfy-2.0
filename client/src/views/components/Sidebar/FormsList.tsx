import React, { useEffect } from 'react';
import { Paper, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../application/store/configureStore';
import { useGetForms } from '../../../application/usecase/useGetForms';
import { useActions } from '../../../application/hooks/useActions';
import { Form } from './Form';

export const FormsList = (props: any) => {
  const { forms, loadingForms, loadFormsFail } = useSelector(
    (state: RootState) => state.forms
  );

  return (
    <Box data-testid='forms-list' sx={{}}>
      <Paper
        sx={{
          margin: 1,
          padding: 1,
          backgroundColor: 'primary.light',
        }}
        elevation={3}
      >
        <div>
          {loadFormsFail ? (
            <div>sorry, there was an error loading the forms</div>
          ) : forms === 'not_initialized' || loadingForms ? (
            <div>loading...</div>
          ) : (
            forms.map((form: any) => {
              return <Form key={form.name} form={form} />;
            })
          )}
        </div>
      </Paper>
    </Box>
  );
};
