import CreateFormInput from '../../../src/application/dto/CreateFormInput';
import CreateForm from '../../../src/application/usecase/CreateForm';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import FormField from '../../../src/domain/entitites/FormField';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
});

test('Should create a form', async () => {
  const createFormInput = new CreateFormInput('Subscription', []);
  const createForm = new CreateForm(formRepositoryDatabase);
  const output = await createForm.execute(createFormInput);
  expect(output.name).toBe('Subscription');
  expect(typeof output.formId).toBe('number');
});

test('Should create a form with one field, and this fields index must be auto-generated', async () => {
  const fields = [new FormField('Short Text', 'Number of patches')];
  const createFormInput = new CreateFormInput('Stock Analysis', fields);
  const createForm = new CreateForm(formRepositoryDatabase);
  const output = await createForm.execute(createFormInput);

  expect(output.fields).toHaveLength(1);
  expect(output.fields[0].index).toBe(0);
});
