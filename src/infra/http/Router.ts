import Http from './Http';
import DatabaseConnection from '../database/DatabaseConnection';
import FormsRouter from './routers/FormsRouter';
import FormFieldsRouter from './routers/FormFieldsRouter';
import RegistriesRouter from './routers/RegistriesRouter';

export default class Router {
  constructor(readonly http: Http, readonly databaseConnection: DatabaseConnection) {
    this.configure();
  }

  configure() {
    const formsRouter = new FormsRouter(this.http, this.databaseConnection);
    const formsFieldsRouter = new FormFieldsRouter(this.http, this.databaseConnection);
    const registriesRouter = new RegistriesRouter(this.http, this.databaseConnection);
  }
}
