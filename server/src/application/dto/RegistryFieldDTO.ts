import { FieldValue } from '../../domain/entitites/Types';
import { FieldType } from '../../domain/entitites/Types';

export default class RegistryFieldDTO {
  constructor(readonly registryId: number, readonly label: string, readonly value: FieldValue) {}
}
