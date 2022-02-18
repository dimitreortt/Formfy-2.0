import React from 'react';
import { FormManageNavbar } from '../components/Navbar/FormManageNavbar';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../application/store/configureStore';
import { useParams } from 'react-router-dom';
import { Preview } from '../components/FormPreview/Preview';

export const FormManagePage = () => {
  const { formId } = useParams();

  const form = useSelector((state: RootState) => {
    if (state.forms.forms === 'not_initialized') return;
    return state.forms.forms.find((form) => form.id.toString() === formId);
  });

  return (
    <div>
      <FormManageNavbar />
      <Box sx={{ marginTop: '120px' }}>
        <Preview form={form} />
      </Box>
    </div>
  );
};
