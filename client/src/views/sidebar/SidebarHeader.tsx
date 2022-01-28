import React from 'react';
import { Box, Typography } from '@mui/material';

export const SidebarHeader = () => {
  return (
    <Box
      data-testid='sidebar-header'
      sx={{ textAlign: 'center', margin: '10px', padding: '10px', backgroundColor: '#eee' }}
    >
      <Typography variant='h6'>
        <b>Forms</b>
      </Typography>
    </Box>
  );
};
