import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import {
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { FormFieldType } from '../../../domain/FormField';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import { FieldOptionsList } from './FieldOptionsList';
import { NewFieldParams } from './AddField';
import { AlertSnackbar } from '../Common/AlertSnackbar';
import { AddOptionButton } from './AddOptionButton';
import { AddOptionConfirmButton } from './AddOptionConfirmButton';
import { CloseAddOptionButton } from './CloseAddOptionButton';
import { AddOptionInput } from './AddOptionInput';

const typeOptions: FormFieldType[] = [
  'Short Text',
  'Long Text',
  'Date',
  'Date and Time',
  'CPF',
  'CNPJ',
  'List Selection',
  'Checkbox',
  'Phone Number',
];

export interface SetFieldProps {
  open: boolean;
  onClose: () => void;
  onSetFieldSubmit: (field: NewFieldParams) => void;
  initialField?: NewFieldParams;
}

export const SetFieldDialog = (props: SetFieldProps) => {
  const { onClose, open, onSetFieldSubmit, initialField } = props;

  const [type, setType] = useState<FormFieldType | ''>('');
  const [label, setLabel] = useState('');
  const [newFieldOption, setNewFieldOption] = useState('');
  const [newFieldOptions, setNewFieldOptions] = useState<string[]>([]);
  const [onAddFieldOption, setOnAddFieldOption] = useState(false);
  const [error, setError] = useState<string>();

  const startState = (initialField: NewFieldParams) => {
    setType(initialField.type);
    setLabel(initialField.label);
    setNewFieldOptions(initialField.options || []);
  };

  useEffect(() => {
    if (initialField) startState(initialField);
  }, []);

  const handleTypeChange = (event: SelectChangeEvent) => {
    //@ts-ignore
    setType(event.target.value);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleNewFieldOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewFieldOption(event.target.value);
  };

  const handleNewFieldOptionAdded = (option: string) => {
    if (!option) return;
    const temp = [...newFieldOptions];
    temp.push(option);
    const unique = [...new Set(temp)];
    setNewFieldOptions(unique);
    setNewFieldOption('');
  };

  const handleRemoveOption = (optionToBeRemoved: string) => {
    if (!optionToBeRemoved) return;
    const filtered = newFieldOptions.filter(
      (option) => option !== optionToBeRemoved
    );
    setNewFieldOptions(filtered);
  };

  const submitField = () => {
    if (!type || !label) return setError('Type and label cannot be empty!');
    onSetFieldSubmit({ label, type, options: newFieldOptions });
    resetState();
    onClose();
  };

  const resetState = () => {
    setNewFieldOption('');
    setNewFieldOptions([]);
    setType('');
    setLabel('');
  };

  return (
    <Dialog onClose={onClose} open={open} PaperProps={{ sx: { width: 300 } }}>
      <DialogTitle sx={{ backgroundColor: 'transparent', border: 0.1, m: 0.3 }}>
        Field Setup
      </DialogTitle>
      {/* <div>Field Setup</div> */}
      <DialogContent
        sx={{
          '& *': {
            // mb: 0.7,
          },
        }}
      >
        <TextField
          sx={{ mt: 0.7 }}
          id='set-field-label'
          label='Label'
          value={label}
          onChange={handleLabelChange}
          fullWidth
        />
        <FormControl sx={{ m: 0, minWidth: 220, mt: 1 }} fullWidth>
          <InputLabel id='select-label'>Type</InputLabel>
          <Select
            labelId='select-label'
            id='select-id'
            value={type}
            inputProps={{ 'data-testid': 'select-type' }}
            label={'Type'}
            onChange={handleTypeChange}
            fullWidth
          >
            {typeOptions &&
              typeOptions.map((option: string) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        {(type === 'List Selection' || type === 'Checkbox') && (
          <Box sx={{ mt: 1 }}>
            <FieldOptionsList
              options={newFieldOptions}
              onRemove={handleRemoveOption}
            />

            {onAddFieldOption && (
              <AddOptionInput
                value={newFieldOption}
                onChange={handleNewFieldOptionChange}
              />
            )}
            <Box sx={{ display: 'flex' }}>
              {onAddFieldOption && (
                <Box sx={{ flexGrow: 1 }}>
                  <AddOptionConfirmButton
                    onClick={() => handleNewFieldOptionAdded(newFieldOption)}
                    disabled={!newFieldOption}
                  />
                  {/* <Button
                    sx={{
                      display: "inline-block",
                      py: 0.2,
                      px: 0.7,
                      minHeight: 0,
                      minWidth: 0,
                    }}
                    onClick={() => handleNewFieldOptionAdded(newFieldOption)}
                  >
                    Confirm
                  </Button> */}
                </Box>
              )}

              {onAddFieldOption ? (
                <CloseAddOptionButton
                  onClick={() => setOnAddFieldOption((prev) => !prev)}
                />
              ) : (
                <AddOptionButton
                  onClick={() => setOnAddFieldOption((prev) => !prev)}
                />
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          role='submit-button'
          variant='outlined'
          color='primary'
          sx={{ mx: 3 }}
          fullWidth
          onClick={submitField}
        >
          submit
        </Button>
      </DialogActions>
      <AlertSnackbar
        open={!!error}
        onClose={() => setError(undefined)}
        severity='warning'
      >
        {error}
      </AlertSnackbar>
    </Dialog>
  );
};
