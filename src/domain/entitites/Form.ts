import FormField from './FormField';

export default class Form {
  fields: { [key: string]: FormField } = {};

  constructor(readonly name: string) {}

  addField(field: FormField) {
    if (this.fields[field.label]) throw new Error('Label already exists in this form');
    this.fields[field.label] = field;
  }
}
