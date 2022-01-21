import CreateFormInput from '../../../src/application/dto/CreateFormInput';
import CreateForm from '../../../src/application/usecase/CreateForm';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import FormField from '../../../src/domain/entitites/FormField';
import GetForm from '../../../src/application/query/GetForm';
import FormDAODatabase from '../../../src/infra/dao/FormDAODatabase';
import GetFormInput from '../../../src/application/dto/GetFormInput';
import DeleteFieldInput from '../../../src/application/dto/DeleteFieldInput';
import DeleteField from '../../../src/application/usecase/DeleteField';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;
let getForm: GetForm;
let createForm: CreateForm;
let deleteField: DeleteField;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
  getForm = new GetForm(new FormDAODatabase(databaseConnection));
  deleteField = new DeleteField(formRepositoryDatabase);
});

test('Should delete a form field', async () => {
  const field = new FormField('List Selection', 'Color', ['Yellow', 'Green', 'Blue']);
  const createFormInput = new CreateFormInput('Paint', [field]);
  const createFormOutput = await createForm.execute(createFormInput);
  const deleteFieldInput = new DeleteFieldInput(createFormOutput.formId, 'Color');
  await deleteField.execute(deleteFieldInput);
  const getFormInput = new GetFormInput('Paint');
  const getFormOutput = await getForm.execute(getFormInput);
  expect(getFormOutput.formFields.length).toBe(0);
});

// fazer o caso de formulário não existe no GetFormTest
