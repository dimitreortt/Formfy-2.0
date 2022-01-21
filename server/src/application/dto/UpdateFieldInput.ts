import { FieldType } from '../../domain/entitites/Types';

export default class UpdateFieldInput {
  constructor(
    readonly label: string,
    readonly formId: number,
    readonly newType: FieldType,
    readonly newLabel: string,
    readonly newOptions?: string[]
  ) {}
}