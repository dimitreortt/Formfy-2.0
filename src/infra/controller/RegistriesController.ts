import DatabaseConnection from '../database/DatabaseConnection';
import CreateRegistry from '../../application/usecase/CreateRegistry';
import RegistryRepositoryDatabase from '../repository/database/RegistryRepositoryDatabase';
import FormDAODatabase from '../dao/FormDAODatabase';
import GetRegistries from '../../application/query/GetRegistries';
import RegistryDAODatabase from '../dao/RegistryDAODatabase';
import UpdateRegistry from '../../application/usecase/UpdateRegistry';
import DeleteRegistry from '../../application/usecase/DeleteRegistry';
import CreateRegistryInput from '../../application/dto/CreateRegistryInput';
import GetRegistriesInput from '../../application/dto/GetRegistriesInput';

export default class RegistriesController {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async createRegistry(params: any, body: any) {
    const createRegistry = new CreateRegistry(
      new RegistryRepositoryDatabase(this.databaseConnection),
      new FormDAODatabase(this.databaseConnection)
    );
    const createRegistryInput = new CreateRegistryInput(body.formId, body.values);
    const output = await createRegistry.execute(createRegistryInput);
    return { status: 201, output };
  }

  async getRegistries(params: any, body: any) {
    const getRegistries = new GetRegistries(new RegistryDAODatabase(this.databaseConnection));
    const getRegistriesInput = new GetRegistriesInput(body.formId);
    const getRegistriesOutput = await getRegistries.execute(getRegistriesInput);
    return { status: 200, output: { registries: getRegistriesOutput.output } };
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
