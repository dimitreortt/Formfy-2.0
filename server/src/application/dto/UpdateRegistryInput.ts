import { RegistryFieldChange } from '../usecase/types/RegistryFieldChange';

export default class UpdateRegistryInput {
  constructor(readonly registryId: number, readonly changes: RegistryFieldChange[]) {}
}
