import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
// import { Paper } from '@mui/material';
import { FormsList } from '../forms/FormsList';
import { SidebarHeader } from './SidebarHeader';

export const Sidebar = (props: any) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box data-testid='collapsible-sidebar'>
      <div>
        {/* <Button onClick={toggleDrawer}>lalala</Button> */}
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          size='medium'
          onClick={toggleDrawer}
          data-testid='toggle-drawer'
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor='left'
          open={open}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { width: '270px' },
          }}
        >
          <SidebarHeader />
          <FormsList />
        </Drawer>
      </div>
    </Box>
  );
};
