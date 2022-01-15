import Http from '../Http';
import DatabaseConnection from '../../database/DatabaseConnection';
import FormsController from '../../controller/FormsController';

export default class FormsRouter {
  constructor(readonly http: Http, readonly databaseConnection: DatabaseConnection) {
    this.configure();
  }

  configure() {
    this.http.on('/form', 'get', async (params: any, body: any) => {
      const formsController = new FormsController(this.databaseConnection);
      return formsController.getForm(params, body);
    });

    this.http.on('/forms', 'get', async (params: any, body: any) => {
      const formsController = new FormsController(this.databaseConnection);
      return formsController.getForms(params, body);
    });

    this.http.on('/form', 'post', async (params: any, body: any) => {
      const formsController = new FormsController(this.databaseConnection);
      return formsController.createForm(params, body);
    });

    this.http.on('/form', 'update', async (params: any, body: any) => {
      const formsController = new FormsController(this.databaseConnection);
      return formsController.updateForm(params, body);
    });

    this.http.on('/form', 'delete', async (params: any, body: any) => {
      const formsController = new FormsController(this.databaseConnection);
      return formsController.deleteForm(params, body);
    });
  }
}
