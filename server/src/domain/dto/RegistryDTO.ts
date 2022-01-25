import { FieldValue, RegistryValues } from '../Types';

export default class RegistryDTO {
  constructor(readonly registryId: number, readonly formId: number) {}
}
