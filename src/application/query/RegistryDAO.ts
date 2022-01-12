import RegistryDTO from '../../domain/dto/RegistryDTO';

export default interface RegistryDAO {
  getRegistries(formId: number): Promise<RegistryDTO[]>;
}
