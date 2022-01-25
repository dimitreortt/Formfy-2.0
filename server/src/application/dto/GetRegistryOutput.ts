import { RegistryValues } from '../../domain/Types';
import RegistryDTO from '../../domain/dto/RegistryDTO';

export default class GetRegistryOutput {
  constructor(readonly registryData: RegistryDTO, readonly values: RegistryValues) {}
}
