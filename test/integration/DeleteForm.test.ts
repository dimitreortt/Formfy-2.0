import CreateFormInput from '../../src/application/dto/CreateFormInput';
import CreateForm from '../../src/application/usecase/CreateForm';
import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';
import FormField from '../../src/domain/entitites/FormField';
import GetForm from '../../src/application/query/GetForm';
import FormDAODatabase from '../../src/infra/dao/FormDAODatabase';
import GetFormInput from '../../src/application/dto/GetFormInput';
import DeleteFormInput from '../../src/application/dto/DeleteFormInput';
import DeleteForm from '../../src/application/usecase/DeleteForm';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;
let getForm: GetForm;
let formId: number;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  const createForm = new CreateForm(formRepositoryDatabase);
  const field = new FormField('Short Text', 'Name');
  const createFormInput = new CreateFormInput('Subscription', [field]);
  const formData = await createForm.execute(createFormInput);
  formId = formData.formId;
  getForm = new GetForm(new FormDAODatabase(databaseConnection));
});

test('Should delete a form', async () => {
  const deleteFormInput = new DeleteFormInput(formId);
  const deleteForm = new DeleteForm(formRepositoryDatabase);
  await deleteForm.execute(deleteFormInput);
  const getFormInput = new GetFormInput('Subscription');
  await expect(async () => {
    await getForm.execute(getFormInput);
  }).rejects.toThrow('Form does not exist');
});

// fazer o caso de formulário não existe no GetFormTest
