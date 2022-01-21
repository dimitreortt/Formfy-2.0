import { FieldValue } from '../../domain/entitites/Types';

export default class CreateRegistryInput {
  constructor(readonly formId: number, readonly values: FieldValue[]) {}
}
