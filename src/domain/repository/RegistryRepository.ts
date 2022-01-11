import Registry from '../entitites/Registry';
import RegistryDTO from '../dto/RegistryDTO';

export default interface RegistryRepository {
  save(registry: Registry, formId: number): Promise<RegistryDTO>;
}
