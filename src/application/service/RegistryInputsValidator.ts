import { FieldValue } from '../../domain/entitites/Types';
import FormField from '../../domain/entitites/FormField';

const isStringArray = (input: any) => {
  return Array.isArray(input) && input.every((e) => typeof e === 'string');
};

export default class RegistryInputsValidator {
  static validate(formFields: FormField[], inputs: FieldValue[]) {
    if (formFields.length !== inputs.length) throw new Error('Registry values list is invalid');
    let index = 0;
    const fieldValueTypeError = new Error('Invalid field value type in registry creation');
    for (const field of formFields) {
      const input = inputs[index++];
      switch (field.type) {
        case 'Short Text':
        case 'Long Text':
        case 'CNPJ':
        case 'CPF':
        case 'Phone Number':
        case 'List Selection':
          if (typeof input !== 'string') throw fieldValueTypeError;
          break;
        case 'Checkbox':
          if (!isStringArray(input)) {
            console.log('To lançando no Checkbox');
            throw fieldValueTypeError;
          }
          break;
        case 'Date':
        case 'Date and Time':
          if (!(input instanceof Date)) {
            console.log('To lançando no Date');
            throw fieldValueTypeError;
          }
          break;
        case 'File':
          if (!(input instanceof File)) throw fieldValueTypeError;
          break;
      }
    }
  }
}
