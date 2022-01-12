import RegistryDTO from '../../domain/dto/RegistryDTO';
import RegistryFieldDTO from '../dto/RegistryFieldDTO';

export default interface RegistryDAO {
  getRegistries(formId: number): Promise<RegistryDTO[]>;
  getRegistryFields(registryId: number): Promise<RegistryFieldDTO[]>;
}
