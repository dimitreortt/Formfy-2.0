import React from 'react';
import { BaseAppBar } from './BaseAppBar';
import { Button, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { OpenRegistriesButton } from './OpenRegistriesButton';

export const FormManageNavbar = () => {
  return (
    <div>
      <BaseAppBar>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ float: 'right' }}>
            <Button variant='contained' color='error'>
              Fill Form
            </Button>
            <OpenRegistriesButton />
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
