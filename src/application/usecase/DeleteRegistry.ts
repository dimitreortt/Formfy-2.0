import RegistryRepository from '../../domain/repository/RegistryRepository';
import DeleteRegistryInput from '../dto/DeleteRegistryInput';

export default class DeleteRegistry {
  constructor(private registryRepository: RegistryRepository) {}

  async execute(input: DeleteRegistryInput): Promise<void> {
    await this.registryRepository.deleteFields(input.registryId);
    await this.registryRepository.delete(input.registryId);
  }
}
