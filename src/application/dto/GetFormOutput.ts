import FormField from '../../domain/entitites/FormField';
import FormDTO from './FormDTO';

export default class GetFormOutput {
  constructor(readonly form: FormDTO, readonly formFields: FormField[]) {}
}
