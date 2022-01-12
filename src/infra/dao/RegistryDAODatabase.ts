import DatabaseConnection from '../database/DatabaseConnection';
import RegistryDAO from '../../application/query/RegistryDAO';
import RegistryDTO from '../../domain/dto/RegistryDTO';

export default class RegistryDAODatabase implements RegistryDAO {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async getRegistries(formId: number): Promise<RegistryDTO[]> {
    const registriesData = await this.databaseConnection.query(
      'select * from formfy.registry where form_id = $1',
      [formId]
    );
    return registriesData;
  }
}
