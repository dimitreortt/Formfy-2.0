import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoveToInbox from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* <Button onClick={toggleDrawer}>lalala</Button> */}
      <IconButton
        edge='start'
        color='inherit'
        aria-label='menu'
        size='medium'
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor='left' open={open} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={toggleDrawer}
          // onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem button onClick={toggleDrawer}>
              ou
              <MoveToInbox></MoveToInbox>
              {/* <ListItemText primary={'a'} /> */}
            </ListItem>
          </List>
          <Divider />
          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Box>
        ajsdoiajs
      </Drawer>
    </div>
  );
}

// {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//   <ListItem button key={text}>
//     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//     <ListItemText primary={text} />
//   </ListItem>
// ))}
