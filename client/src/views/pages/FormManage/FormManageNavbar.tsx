import React from 'react';
import { BaseAppBar } from '../../components/BaseAppBar';
import { Button, Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export const FormManageNavbar = () => {
  return (
    <div>
      <BaseAppBar>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ float: 'right' }}>
            <Button variant='contained' color='error'>
              Fill Form
            </Button>
            <Button variant='contained' color='success'>
              {' '}
              Registries 15
            </Button>
            <Button variant='contained'>
              <ClearIcon />
            </Button>
            {/* <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              size='medium'
              data-testid='toggle-drawer'
            >
              <ClearIcon />
            </IconButton> */}
          </Box>
        </Box>
      </BaseAppBar>
    </div>
  );
};
