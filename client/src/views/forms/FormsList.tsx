import React, { useState, useEffect } from 'react';
import { Paper, createStyles, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../application/store/configureStore';
import { useForms } from '../../application/hooks/useForms';
import { useGetForms } from '../../application/usecase/useGetForms';
import { Form } from './Form';
import { useActions } from '../../application/hooks/useActions';

export const FormsList = (props: any) => {
  const fakeForms = [{ name: 'Fake Form 1' }, { name: 'Fake Form 2' }];
  // const { forms, loadingForms, loadFormsFail } = useForms();
  const { forms, loadingForms, loadFormsFail } = useSelector((state: RootState) => state.forms);
  const { getForms } = useGetForms();
  const { pageLoaded } = useActions();

  useEffect(() => {
    pageLoaded();
    getForms();
  }, []);

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
