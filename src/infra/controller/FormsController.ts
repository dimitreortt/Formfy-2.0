import DatabaseConnection from '../database/DatabaseConnection';
import CreateForm from '../../application/usecase/CreateForm';
import UpdateForm from '../../application/usecase/UpdateForm';
import DeleteForm from '../../application/usecase/DeleteForm';
import FormRepositoryDatabase from '../repository/database/FormRepositoryDatabase';
import GetForms from '../../application/query/GetForms';
import GetForm from '../../application/query/GetForm';
import FormDAODatabase from '../dao/FormDAODatabase';

export default class FormsController {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  createForm(params: any, body: any) {
    const createForm = new CreateForm(new FormRepositoryDatabase(this.databaseConnection));
    return createForm.execute(body);
  }

  getForms(params: any, body: any) {
    const getForms = new GetForms(new FormDAODatabase(this.databaseConnection));
    return getForms.execute();
  }

  getForm(params: any, body: any) {
    const getForm = new GetForm(new FormDAODatabase(this.databaseConnection));
    return getForm.execute(body);
  }

  updateForm(params: any, body: any) {
    const updateForm = new UpdateForm(new FormRepositoryDatabase(this.databaseConnection));
    return updateForm.execute(body);
  }

  deleteForm(params: any, body: any) {
    const deleteForm = new DeleteForm(new FormRepositoryDatabase(this.databaseConnection));
    return deleteForm.execute(body);
  }
}
