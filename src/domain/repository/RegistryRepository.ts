import { FieldValue } from './../entitites/Types';
import Registry from '../entitites/Registry';
import RegistryDTO from '../dto/RegistryDTO';

export default interface RegistryRepository {
  save(registry: Registry, formId: number): Promise<RegistryDTO>;
  updateField(registryId: number, label: string, newValue: FieldValue): Promise<void>;
}
