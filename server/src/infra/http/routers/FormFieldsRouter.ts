import Http from '../Http';
import DatabaseConnection from '../../database/DatabaseConnection';
import FormFieldsController from '../../controller/FormFieldsController';

export default class FormsFieldsRouter {
  constructor(readonly http: Http, readonly databaseConnection: DatabaseConnection) {
    this.configure();
  }

  configure() {
    this.http.on('/formField/moveUp', 'patch', async (params: any, body: any) => {
      console.log(body);
      const formsFieldsController = new FormFieldsController(this.databaseConnection);
      return formsFieldsController.moveFieldUp(params, body);
    });

    this.http.on('/formField', 'patch', async (params: any, body: any) => {
      const formsFieldsController = new FormFieldsController(this.databaseConnection);
      return formsFieldsController.updateField(params, body);
    });

    this.http.on('/formField', 'delete', async (params: any, body: any) => {
      const formsFieldsController = new FormFieldsController(this.databaseConnection);
      return formsFieldsController.deleteField(params, body);
    });

    this.http.on('/formField/moveDown', 'patch', async (params: any, body: any) => {
      const formsFieldsController = new FormFieldsController(this.databaseConnection);
      return formsFieldsController.moveFieldDown(params, body);
    });
  }
}
