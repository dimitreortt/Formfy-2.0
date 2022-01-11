import FormField from '../../domain/entitites/FormField';
import FormDTO from '../../domain/dto/FormDTO';

export default class GetFormOutput {
  constructor(readonly form: FormDTO, readonly formFields: FormField[]) {}
}
