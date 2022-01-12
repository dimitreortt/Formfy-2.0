import { FieldValue } from './../entitites/Types';

export default class RegistryDTO {
  constructor(
    readonly registryId: number,
    readonly formId: number,
    readonly values?: FieldValue[]
  ) {}
}
