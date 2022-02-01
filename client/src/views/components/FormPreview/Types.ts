import { FormFieldValue } from './../../../domain/FormField';

export type FormFieldStrategyProps = {
  label: string;
  options: string[] | undefined;
  onChange: (label: string, value: FormFieldValue) => void;
};
