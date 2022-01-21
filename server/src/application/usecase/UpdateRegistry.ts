import RegistryRepository from '../../domain/repository/RegistryRepository';
import UpdateRegistryInput from '../dto/UpdateRegistryInput';

export default class UpdateRegistry {
  constructor(private registryRepository: RegistryRepository) {}

  async execute(input: UpdateRegistryInput): Promise<void> {
    for (const change of input.changes) {
      await this.registryRepository.updateField(
        input.registryId,
        change.fieldLabel,
        change.newValue
      );
    }
  }
}
