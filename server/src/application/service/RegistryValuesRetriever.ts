import { RegistryValues } from '../../domain/entitites/Types';
import RegistryFieldDTO from '../dto/RegistryFieldDTO';

export default class RegistryValuesRetriever {
  static retrieve(registryFieldsData: RegistryFieldDTO[]): RegistryValues {
    const values: RegistryValues = {};
    for (const registryFieldData of registryFieldsData) {
      values[registryFieldData.label] = registryFieldData.value;
    }
    return values;
  }
}
