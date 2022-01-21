import FormField from '../../domain/entitites/FormField';

export default class CreateFormInput {
  constructor(readonly name: string, readonly fields: FormField[]) {}
}
