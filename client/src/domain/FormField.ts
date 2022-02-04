export type FormFieldType =
  | 'Short Text'
  | 'Long Text'
  | 'Date'
  | 'Date and Time'
  | 'CPF'
  | 'CNPJ'
  | 'List Selection'
  | 'Checkbox'
  | 'Phone Number'
  | 'File';

export type FormFieldValue = string | string[] | File | Date;

export type IFormField = {
  label: string;
  type: FormFieldType;
  id: number;
  index: number;
  options?: string[];
};
