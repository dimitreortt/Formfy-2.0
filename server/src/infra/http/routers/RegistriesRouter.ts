import Http from '../Http';
import DatabaseConnection from '../../database/DatabaseConnection';
import RegistriesController from '../../controller/RegistriesController';

export default class Router {
  constructor(readonly http: Http, readonly databaseConnection: DatabaseConnection) {
    this.configure();
  }

  configure() {
    this.http.on('/registries', 'get', async (params: any, body: any) => {
      const registriesController = new RegistriesController(this.databaseConnection);
      return registriesController.getRegistries(params, body);
    });

    this.http.on('/registry', 'post', async (params: any, body: any) => {
      const registriesController = new RegistriesController(this.databaseConnection);
      return registriesController.createRegistry(params, body);
    });

    this.http.on('/registry', 'patch', async (params: any, body: any) => {
      const registriesController = new RegistriesController(this.databaseConnection);
      return registriesController.updateRegistry(params, body);
    });

    this.http.on('/registry', 'delete', async (params: any, body: any) => {
      const registriesController = new RegistriesController(this.databaseConnection);
      return registriesController.deleteRegistry(params, body);
    });
  }
}
