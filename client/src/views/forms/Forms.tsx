import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../application/store/configureStore';
import { useForms } from '../../application/hooks/useForms';

export const Forms = (props: any) => {
  const fakeForms = [{ name: 'Fake Form 1' }, { name: 'Fake Form 2' }];
  const { forms, loadingForms, loadFormsFail } = useForms();

  return (
    <div data-testid='forms'>
      <div>
        {loadFormsFail ? (
          <div>sorry, there was an error loading the forms</div>
        ) : forms === 'not_initialized' || loadingForms ? (
          <div>loading...</div>
        ) : (
          forms.map((form: any) => {
            return <Paper key={form}>{form.name}</Paper>;
          })
        )}
      </div>
    </div>
  );
};
