import { FieldType } from '../Types';

export default class FormField {
  constructor(
    readonly type: FieldType,
    readonly label: string,
    readonly index: number,
    readonly options?: string[]
  ) {}
}
