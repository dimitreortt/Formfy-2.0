import DatabaseConnection from '../database/DatabaseConnection';
import CreateRegistry from '../../application/usecase/CreateRegistry';
import RegistryRepositoryDatabase from '../repository/database/RegistryRepositoryDatabase';
import FormDAODatabase from '../dao/FormDAODatabase';
import GetRegistries from '../../application/query/GetRegistries';
import RegistryDAODatabase from '../dao/RegistryDAODatabase';
import UpdateRegistry from '../../application/usecase/UpdateRegistry';
import DeleteRegistry from '../../application/usecase/DeleteRegistry';

export default class RegistriesController {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  createRegistry(params: any, body: any) {
    const createRegistry = new CreateRegistry(
      new RegistryRepositoryDatabase(this.databaseConnection),
      new FormDAODatabase(this.databaseConnection)
    );
    return createRegistry.execute(body);
  }

  getRegistries(params: any, body: any) {
    const getRegistries = new GetRegistries(new RegistryDAODatabase(this.databaseConnection));
    return getRegistries.execute(body);
  }

  updateRegistry(params: any, body: any) {
    const updateRegistry = new UpdateRegistry(
      new RegistryRepositoryDatabase(this.databaseConnection)
    );
    return updateRegistry.execute(body);
  }

  deleteRegistry(params: any, body: any) {
    const deleteRegistry = new DeleteRegistry(
      new RegistryRepositoryDatabase(this.databaseConnection)
    );
    return deleteRegistry.execute(body);
  }
}
