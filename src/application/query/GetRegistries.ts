import RegistryDAO from './RegistryDAO';
import GetRegistriesInput from '../dto/GetRegistriesInput';
import GetRegistriesOutput from '../dto/GetRegistriesOutput';
import RegistryDTO from '../../domain/dto/RegistryDTO';

export default class GetRegistries {
  constructor(readonly registryDAO: RegistryDAO) {}

  async execute(input: GetRegistriesInput): Promise<GetRegistriesOutput> {
    const registriesData = await this.registryDAO.getRegistries(input.formId);
    const output: RegistryDTO[] = [];
    for (const registryData of registriesData) {
      const registryFieldsData = await this.registryDAO.getRegistryFields(registryData.registryId);
      const registryValues = registryFieldsData.map((registryFieldData) => registryFieldData.value);
      output.push(new RegistryDTO(registryData.registryId, input.formId, registryValues));
    }
    return new GetRegistriesOutput(output);
  }
}
