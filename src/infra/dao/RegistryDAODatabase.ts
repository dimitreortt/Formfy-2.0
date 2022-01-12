import DatabaseConnection from '../database/DatabaseConnection';
import RegistryDAO from '../../application/query/RegistryDAO';
import RegistryDTO from '../../domain/dto/RegistryDTO';
import RegistryFieldDTO from '../../application/dto/RegistryFieldDTO';

export default class RegistryDAODatabase implements RegistryDAO {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async getRegistries(formId: number): Promise<RegistryDTO[]> {
    const registriesData = await this.databaseConnection.query(
      'select * from formfy.registry where form_id = $1',
      [formId]
    );
    const registries = registriesData.map(
      (registryData: any) => new RegistryDTO(registryData.id, registryData.form_id)
    );
    return registries;
  }

  async getRegistryFields(registryId: number): Promise<RegistryFieldDTO[]> {
    const registryFieldsData = await this.databaseConnection.query(
      'select * from formfy.registry_field where registry_id = $1',
      [registryId]
    );
    return registryFieldsData;
  }
}
