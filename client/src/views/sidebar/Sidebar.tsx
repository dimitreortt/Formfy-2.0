import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
// import { Paper } from '@mui/material';
import { FormsList } from '../forms/FormsList';
import { SidebarHeader } from './SidebarHeader';
import { useGetForms } from '../../application/usecase/useGetForms';
import { useActions } from '../../application/hooks/useActions';

export const Sidebar = (props: any) => {
  const [open, setOpen] = useState(true);
  const { getForms } = useGetForms();
  const { pageLoaded } = useActions();

  useEffect(() => {
    pageLoaded();
    getForms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
