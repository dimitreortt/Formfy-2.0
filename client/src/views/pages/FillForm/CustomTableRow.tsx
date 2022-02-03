import React, { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { IFormField } from '../../../domain/FormField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      // borderColor: alpha(theme.palette.primary.main, 0.1),
    },
  })
);

type Props = {
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  field: IFormField;
};

export const CustomTableRow: FunctionComponent<Props> = ({
  field,
  handleMoveUp,
  handleMoveDown,
}) => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        margin: 0.5,
        border: 1,
        borderRadius: 1,
        borderColor: 'primary.light',
        borderWidth: 4,
        padding: 0.5,
      }}
      className={classes.row}
    >
      <Box flexGrow={2}>{field.label}</Box>
      <Box flexGrow={2}>{field.options?.join(', ')}</Box>
      {/* <Box flexGrow={3}>oi3</Box>
      <Box flexGrow={6}>oi4</Box> */}
      <Button onClick={handleMoveDown}>down</Button>
      <Button onClick={handleMoveUp}>up</Button>
    </Box>
  );
};
