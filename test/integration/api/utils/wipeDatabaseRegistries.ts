import FormDAO from '../../../../src/application/query/FormDAO';
import RegistryDAO from '../../../../src/application/query/RegistryDAO';
import RegistryRepository from '../../../../src/domain/repository/RegistryRepository';

export const wipeDatabaseRegistries = async (
  formDAO: FormDAO,
  registryDAO: RegistryDAO,
  registryRepository: RegistryRepository
) => {
  const forms = await formDAO.getForms();
  for (const form of forms) {
    const registries = await registryDAO.getRegistries(form.id);
    for (const registry of registries) {
      await registryRepository.deleteFields(registry.registryId);
      await registryRepository.delete(registry.registryId);
    }
  }
};
