import { FieldValue } from './../../domain/entitites/Types';

export default class CreateRegistryInput {
  constructor(readonly formName: string, readonly formId: number, readonly values: FieldValue[]) {}
}
