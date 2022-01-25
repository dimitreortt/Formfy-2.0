import { FieldType } from '../../domain/Types';

export default class FormFieldDTO {
  constructor(
    readonly form_id: number,
    readonly id: number,
    readonly label: string,
    readonly type: FieldType,
    readonly options?: string[]
  ) {}
}
