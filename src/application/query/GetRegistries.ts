import { FieldValue, RegistryValues } from './../../domain/entitites/Types';
import RegistryDAO from './RegistryDAO';
import GetRegistriesInput from '../dto/GetRegistriesInput';
import GetRegistriesOutput from '../dto/GetRegistriesOutput';
import RegistryDTO from '../../domain/dto/RegistryDTO';
import GetRegistryOutput from '../dto/GetRegistryOutput';

export default class GetRegistries {
  constructor(readonly registryDAO: RegistryDAO) {}

  async execute(input: GetRegistriesInput): Promise<GetRegistriesOutput> {
    const registriesData = await this.registryDAO.getRegistries(input.formId);
    const output: GetRegistryOutput[] = [];
    for (const registryData of registriesData) {
      const registryFieldsData = await this.registryDAO.getRegistryFields(registryData.registryId);
      const values: RegistryValues = {};
      for (const registryFieldData of registryFieldsData) {
        values[registryFieldData.label] = registryFieldData.value;
      }
      output.push(
        new GetRegistryOutput(new RegistryDTO(registryData.registryId, input.formId), values)
      );
    }
    return new GetRegistriesOutput(output);
  }
}
