import { FieldValue, RegistryValues } from './Types';
import FormField from './FormField';

export default class Registry {
  values: RegistryValues = {};

  constructor(readonly fields: FormField[], readonly inputs: FieldValue[]) {
    let index = 0;
    for (const field of fields) {
      this.values[field.label] = inputs[index++];
    }
  }
}
