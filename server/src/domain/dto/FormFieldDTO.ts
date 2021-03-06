import { FieldType } from '../Types';

export default class FormFieldDTO {
  constructor(
    readonly form_id: number,
    readonly id: number,
    readonly label: string,
    readonly type: FieldType,
    readonly index: number,
    readonly options?: string[]
  ) {}
}
