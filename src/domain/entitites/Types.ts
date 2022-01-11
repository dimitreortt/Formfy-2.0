export type FieldType =
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

export type FieldValue = string | string[] | File | Date;
