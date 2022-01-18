import FormRepositoryMemory from '../../../src/infra/repository/memory/FormRepositoryMemory';
import CreateForm from '../../../src/application/usecase/CreateForm';
import CreateFormInput from '../../../src/application/dto/CreateFormInput';
import GetForms from '../../../src/application/query/GetForms';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import FormDAODatabase from '../../../src/infra/dao/FormDAODatabase';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;
let createForm: CreateForm;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
});

test('Should get all forms', async () => {
  const createFormInput1 = new CreateFormInput('Crop Report', []);
  const createFormInput2 = new CreateFormInput('Product Treatment', []);
  const createFormInput3 = new CreateFormInput('Library Assessment', []);
  await createForm.execute(createFormInput1);
  await createForm.execute(createFormInput2);
  await createForm.execute(createFormInput3);
  const getForms = new GetForms(new FormDAODatabase(databaseConnection));
  const output = await getForms.execute();
  expect(output.length).toBe(3);
});
