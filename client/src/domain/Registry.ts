import { FormFieldValue } from './FormField';

export type RegistryValues = { [key: string]: FormFieldValue };

export type RegistryFieldChange = { fieldLabel: string; newValue: FormFieldValue };

export type IRegistry = {
  values: RegistryValues;
};
