import React, { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import { FormFieldStrategyProps } from './Types';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

const getInitialState = (options: string[] | undefined) => {
  if (!options) return {};
  let state: any = {};
  for (const option of options) {
    state[option] = false;
  }
  return state;
};

const stateToStringArray = (state: { [key: string]: boolean }) => {
  const selectedOptions: string[] = [];
  for (const option in state) {
    if (state[option]) selectedOptions.push(option);
  }
  return selectedOptions;
};

export const CheckboxFormField: FunctionComponent<FormFieldStrategyProps> = ({
  label,
  options,
  onChange,
}) => {
  const [state, setState] = React.useState(getInitialState(options));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...state,
      [event.target.name]: event.target.checked,
    };
    setState(newState);
    onChange(label, stateToStringArray(newState));
  };

  return (
    <FormControl required error={false} component='fieldset' sx={{ m: 3 }} variant='standard'>
      <FormLabel component='legend'>{label}</FormLabel>
      <FormGroup>
        {options?.length &&
          options.map((option: string) => {
            return (
              <FormControlLabel
                key={option}
                control={<Checkbox checked={state[option]} onChange={handleChange} name={option} />}
                label={option}
              />
            );
          })}
      </FormGroup>
      <FormHelperText>You can display an error</FormHelperText>
    </FormControl>
  );
};
