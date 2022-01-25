import { FieldValue } from '../../domain/Types';
import { FieldType } from '../../domain/Types';

export default class RegistryFieldDTO {
  constructor(readonly registryId: number, readonly label: string, readonly value: FieldValue) {}
}
