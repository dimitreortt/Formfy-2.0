import RegistryRepository from '../../../domain/repository/RegistryRepository';
import DatabaseConnection from '../../database/DatabaseConnection';
import Registry from '../../../domain/entitites/Registry';
import RegistryDTO from '../../../domain/dto/RegistryDTO';

export default class RegistryRepositoryDatabase implements RegistryRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async save(registry: Registry, formId: number): Promise<RegistryDTO> {
    const [
      registryData,
    ] = await this.databaseConnection.query(
      'insert into formfy.registry (form_id) values ($1) returning *;',
      [formId]
    );
    for (const fieldLabel in registry.values) {
      if (!registry.values[fieldLabel]) continue;
      await this.databaseConnection.query(
        'insert into formfy.registry_field (registry_id, label, value) values ($1, $2, $3);',
        [registryData.id, fieldLabel, registry.values[fieldLabel]]
      );
    }
    return new RegistryDTO(registryData.id, registryData.form_id);
  }
}
