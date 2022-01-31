import { FormFieldValue } from './../../../domain/FormField';

export type FormFielStrategyProps = {
  label: string;
  onChange: (label: string, value: FormFieldValue) => void;
};
