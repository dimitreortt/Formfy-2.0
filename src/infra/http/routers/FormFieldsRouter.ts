import Http from '../Http';
import DatabaseConnection from '../../database/DatabaseConnection';
import FormFieldsController from '../../controller/FormFieldsController';

export default class FormsFieldsRouter {
  constructor(readonly http: Http, readonly databaseConnection: DatabaseConnection) {
    this.configure();
  }

  configure() {
    this.http.on('/form', 'patch', async (params: any, body: any) => {
      const formsFieldsController = new FormFieldsController(this.databaseConnection);
      return formsFieldsController.updateField(params, body);
    });

    this.http.on('/form', 'delete', async (params: any, body: any) => {
      const formsFieldsController = new FormFieldsController(this.databaseConnection);
      return formsFieldsController.deleteField(params, body);
    });
  }
}
