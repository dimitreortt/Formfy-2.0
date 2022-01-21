import { FieldValue, RegistryValues } from '../entitites/Types';

export default class RegistryDTO {
  constructor(readonly registryId: number, readonly formId: number) {}
}
