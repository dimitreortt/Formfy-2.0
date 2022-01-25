import { FieldType } from '../Types';

export default class FormField {
  constructor(readonly type: FieldType, readonly label: string, readonly options?: string[]) {}
}
