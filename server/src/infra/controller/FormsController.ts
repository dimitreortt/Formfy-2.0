import DatabaseConnection from '../database/DatabaseConnection';
import CreateForm from '../../application/usecase/CreateForm';
import UpdateForm from '../../application/usecase/UpdateForm';
import DeleteForm from '../../application/usecase/DeleteForm';
import FormRepositoryDatabase from '../repository/database/FormRepositoryDatabase';
import GetForms from '../../application/query/GetForms';
import GetForm from '../../application/query/GetForm';
import FormDAODatabase from '../dao/FormDAODatabase';
import CreateFormInput from '../../application/dto/CreateFormInput';
import UpdateFormInput from '../../application/dto/UpdateFormInput';
import FormField from '../../domain/entitites/FormField';
import GetFormInput from '../../application/dto/GetFormInput';

export default class FormsController {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async createForm(params: any, body: any) {
    if (!body.fields) throw new Error('List of form fields cannot be empty');
    const createForm = new CreateForm(new FormRepositoryDatabase(this.databaseConnection));
    const fields: FormField[] = [];
    for (const fieldData of body.fields) {
      //TODO: Validação do fieldData.type
      const formField = new FormField(fieldData.type, fieldData.label, fieldData.options);
      fields.push(formField);
    }
    const createFormInput = new CreateFormInput(body.name, fields);
    const output = await createForm.execute(createFormInput);
    return { status: 201, output };
  }

  async getForms(params: any, body: any) {
    const getForms = new GetForms(new FormDAODatabase(this.databaseConnection));
    const forms = await getForms.execute();
    return {
      status: 200,
      output: {
        forms,
      },
    };
  }

  async getForm(params: any, body: any) {
    const getForm = new GetForm(new FormDAODatabase(this.databaseConnection));
    const getFormInput = new GetFormInput(body.name);
    const output = await getForm.execute(getFormInput);
    return { status: 200, output };
  }

  async updateForm(params: any, body: any) {
    const updateForm = new UpdateForm(new FormRepositoryDatabase(this.databaseConnection));
    const updateFormInput = new UpdateFormInput(body.name, body.newName);
    const output = await updateForm.execute(updateFormInput);
    return { status: 204, output };
  }

  async deleteForm(params: any, body: any) {
    const deleteForm = new DeleteForm(new FormRepositoryDatabase(this.databaseConnection));
    await deleteForm.execute(body);
    return { status: 204, output: {} };
  }
}
