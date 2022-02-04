import FormFieldDTO from '../../domain/dto/FormFieldDTO';

export default class CreateFormOutput {
  constructor(readonly name: string, readonly formId: number, readonly fields: FormFieldDTO[]) {}
}
