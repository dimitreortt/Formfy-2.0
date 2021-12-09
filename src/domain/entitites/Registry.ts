import Form from './Form';

// isso aqui tá ruim, não existe essa de type na paçoca, criar um DTO aqui
type FieldValue = string | string[];

export default class Registry {
  values: { [key: string]: FieldValue } = {};

  constructor(readonly form: Form, readonly inputs: FieldValue[]) {
    let index = 0;
    for (const label in form.fields) {
      this.values[label] = inputs[index++];
    }
  }
}
