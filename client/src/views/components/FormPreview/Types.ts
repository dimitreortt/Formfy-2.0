import { FormFieldValue } from './../../../domain/FormField';

export type FormFieldStrategyProps = {
  label: string;
  onChange: (label: string, value: FormFieldValue) => void;
};
