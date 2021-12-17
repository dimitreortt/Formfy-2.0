import Form from '../../domain/entitites/Form';
import FormField from '../../domain/entitites/FormField';

export default class GetFormOutput {
  constructor(readonly form: Form, readonly formFields: FormField[]) {}
}
