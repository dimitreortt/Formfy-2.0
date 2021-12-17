import CreateFormInput from '../../src/application/dto/CreateFormInput';
import CreateForm from '../../src/application/usecase/CreateForm';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';

let databaseConnection: any;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
});

test('Should create a form', async () => {
  const createFormInput = new CreateFormInput('Subscription', []);
  const formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);

  const createForm = new CreateForm(formRepositoryDatabase);
  const output = await createForm.execute(createFormInput);
  expect(output.name).toBe('Subscription');
});
