import FormFieldDTO from './FormFieldDTO';

export default class FormDTO {
  constructor(readonly name: string, readonly id: number, readonly fields: FormFieldDTO[]) {}
}
