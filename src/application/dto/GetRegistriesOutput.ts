import RegistryDTO from '../../domain/dto/RegistryDTO';

export default class GetRegistriesOutput {
  constructor(readonly registries: RegistryDTO[]) {}
}
