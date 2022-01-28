import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Sidebar } from '../sidebar/Sidebar';

export function BaseAppBar(props: any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar variant='dense'>
          <Sidebar />
          {props.children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
