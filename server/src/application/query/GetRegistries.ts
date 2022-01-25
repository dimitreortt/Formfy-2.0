import { FieldValue, RegistryValues } from '../../domain/Types';
import RegistryDAO from './RegistryDAO';
import GetRegistriesInput from '../dto/GetRegistriesInput';
import GetRegistriesOutput from '../dto/GetRegistriesOutput';
import RegistryDTO from '../../domain/dto/RegistryDTO';
import GetRegistryOutput from '../dto/GetRegistryOutput';
import RegistryValuesRetriever from '../service/RegistryValuesRetriever';

export default class GetRegistries {
  constructor(readonly registryDAO: RegistryDAO) {}

  async execute(input: GetRegistriesInput): Promise<GetRegistriesOutput> {
    const registriesData = await this.registryDAO.getRegistries(input.formId);
    const output: GetRegistryOutput[] = [];
    for (const registryData of registriesData) {
      const registryFieldsData = await this.registryDAO.getRegistryFields(registryData.registryId);
      const values: RegistryValues = RegistryValuesRetriever.retrieve(registryFieldsData);
      output.push(
        new GetRegistryOutput(new RegistryDTO(registryData.registryId, input.formId), values)
      );
    }
    return new GetRegistriesOutput(output);
  }
}
