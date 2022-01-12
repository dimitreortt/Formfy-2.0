import RegistryDTO from '../../domain/dto/RegistryDTO';

export default interface RegistryDAO {
  getRegistries(): Promise<RegistryDTO[]>;
}
