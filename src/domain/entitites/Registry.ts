import { FieldValue } from './Types';
import Form from './Form';
import FormField from './FormField';

export default class Registry {
  values: { [key: string]: FieldValue } = {};

  constructor(readonly fields: FormField[], readonly inputs: FieldValue[]) {
    let index = 0;
    for (const field of fields) {
      this.values[field.label] = inputs[index++];
    }
  }
}
