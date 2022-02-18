import { IFormField } from './FormField';

export type IForm = {
  name: string;
  id: number;
  fields: IFormField[];
};
