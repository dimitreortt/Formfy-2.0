import React, { FunctionComponent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { IFormField } from '../../../domain/FormField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../application/store/configureStore';
import { TableRowOptions } from './TableRowOptions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      // borderColor: alpha(theme.palette.primary.main, 0.1),
    },
  })
);

type Props = {
  handleMoveUp: (clickedField: IFormField) => void;
  handleMoveDown: (clickedField: IFormField) => void;
  field: IFormField;
  formId: number;
};

export const CustomTableRow: FunctionComponent<Props> = ({
  field,
  formId,
  handleMoveUp,
  handleMoveDown,
}) => {
  const classes = useStyles();
  const { awaitingMoveUp, moveUpFail, awaitingMoveDown, moveDownFail } =
    useSelector((state: RootState) => state.formFields);
  const [rowAwaiting, setRowAwaiting] = useState(false);
  const [optionsPopoverOpen, setOptionsPopoverOpen] = useState(false);

  const toggleOptionsPopover = () => setOptionsPopoverOpen((prev) => !prev);

  useEffect(() => {
    if (!rowAwaiting) return;
    if (awaitingMoveUp) return;
    if (moveUpFail) {
      // show message for few seconds then come back to previous
      alert('Move up failed!');
    }

    setRowAwaiting(false);
  }, [awaitingMoveUp]);

  useEffect(() => {
    if (!rowAwaiting) return;
    if (awaitingMoveDown) return;
    if (moveDownFail) {
      // show message for few seconds then come back to previous
      alert('Move down failed!');
    }

    setRowAwaiting(false);
  }, [awaitingMoveDown]);

  const moveUp = () => {
    if (rowAwaiting) return;
    setRowAwaiting(true);
    handleMoveUp(field);
  };

  const moveDown = () => {
    if (rowAwaiting) return;
    setRowAwaiting(true);
    handleMoveDown(field);
  };

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
      {(awaitingMoveUp || awaitingMoveDown) && rowAwaiting ? (
        <div>Spinner</div>
      ) : (
        <>
          <Box flexGrow={1}>{field.label}</Box>
          <Box flexGrow={1}>{field.type}</Box>
          <Box flexGrow={1}>index, tirar! kk {field.index}</Box>
          <Box flexGrow={1}>{field.options?.join(', ')}</Box>
          <Button onClick={moveDown}>down</Button>
          <Button onClick={moveUp}>up</Button>

          <TableRowOptions
            toggleOptionsPopover={toggleOptionsPopover}
            field={field}
            formId={formId}
          />
        </>
      )}
    </Box>
  );
};
