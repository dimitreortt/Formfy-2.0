import { FieldValue } from '../../domain/Types';

export default class CreateRegistryInput {
  constructor(readonly formId: number, readonly values: FieldValue[]) {}
}
