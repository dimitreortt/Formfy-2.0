import CreateFormInput from '../../../src/application/dto/CreateFormInput';
import CreateForm from '../../../src/application/usecase/CreateForm';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import FormField from '../../../src/domain/entitites/FormField';
import GetForm from '../../../src/application/query/GetForm';
import FormDAODatabase from '../../../src/infra/dao/FormDAODatabase';
import GetFormInput from '../../../src/application/dto/GetFormInput';
import UpdateForm from '../../../src/application/usecase/UpdateForm';
import UpdateFormInput from '../../../src/application/dto/UpdateFormInput';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;
let getForm: GetForm;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  const createForm = new CreateForm(formRepositoryDatabase);
  const field = new FormField('Short Text', 'Name');
  const createFormInput = new CreateFormInput('Subscription', [field]);
  await createForm.execute(createFormInput);
  getForm = new GetForm(new FormDAODatabase(databaseConnection));
});

test('Should update a form', async () => {
  const updateFormInput = new UpdateFormInput('Subscription', 'Performance');
  const updateForm = new UpdateForm(formRepositoryDatabase);
  await updateForm.execute(updateFormInput);
  const getFormInput1 = new GetFormInput('Subscription');
  await expect(async () => {
    await getForm.execute(getFormInput1);
  }).rejects.toThrow('Form does not exist');
  const getFormInput2 = new GetFormInput('Performance');
  const getFormOutput = await getForm.execute(getFormInput2);
  expect(getFormOutput.form.name).toBe('Performance');
  expect(getFormOutput.formFields.length).toBe(1);
  expect(getFormOutput.formFields[0].label).toBe('Name');
});

// fazer o caso de formulário não existe no GetFormTest
