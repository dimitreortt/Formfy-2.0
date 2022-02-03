import React from 'react';
import { FunctionComponent } from 'react';
import { IForm } from '../../domain/Form';
import { Paper, Box, Typography, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = { form: IForm };

export const Form: FunctionComponent<Props> = ({ form }) => {
  return (
    <Box
      sx={{
        margin: '10px',
      }}
    >
      <Paper
        sx={{
          padding: '10px',
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Box
          sx={{
            ':hover': {
              // cursor: 'pointer',
              backgroundColor: '#888',
            },
          }}
        >
          <Button
            component={Link}
            to={`/fillForm/${form.id}`}
            variant='text'
            sx={{ color: 'yellow', width: '100%', justifyContent: 'left' }}
          >
            <Typography variant='h6'>{form.name}</Typography>
          </Button>
        </Box>
        <Box sx={{ marginY: 1 }}>
          <Divider />
        </Box>
        <Button component={Link} to={`/formManage/${form.id}`} variant='contained' color='success'>
          Manage
        </Button>
        <Button variant='contained' color='info'>
          test
        </Button>
      </Paper>
    </Box>
  );
};
