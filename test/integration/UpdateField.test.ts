import CreateFormInput from '../../src/application/dto/CreateFormInput';
import CreateForm from '../../src/application/usecase/CreateForm';
import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';
import FormField from '../../src/domain/entitites/FormField';
import GetForm from '../../src/application/query/GetForm';
import FormDAODatabase from '../../src/infra/dao/FormDAODatabase';
import GetFormInput from '../../src/application/dto/GetFormInput';
import UpdateFieldInput from '../../src/application/dto/UpdateFieldInput';
import UpdateField from '../../src/application/usecase/UpdateField';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;
let getForm: GetForm;
let createForm: CreateForm;
let updateField: UpdateField;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
  getForm = new GetForm(new FormDAODatabase(databaseConnection));
  updateField = new UpdateField(formRepositoryDatabase);
});

test('Should update a form field', async () => {
  const oldListSelectionOptions = ['Yellow', 'Green', 'Blue'];
  const field = new FormField('List Selection', 'Color', oldListSelectionOptions);
  const createFormInput = new CreateFormInput('Paint', [field]);
  const createFormOutput = await createForm.execute(createFormInput);
  const newListSelectionOptions = ['Yellow', 'Green', 'Blue', 'Marsala'];
  const updateFieldInput = new UpdateFieldInput(
    'Color',
    createFormOutput.formId,
    'List Selection',
    'Base Color',
    newListSelectionOptions
  );
  await updateField.execute(updateFieldInput);
  const getFormInput = new GetFormInput('Paint');
  const getFormOutput = await getForm.execute(getFormInput);
  expect(getFormOutput.formFields.length).toBe(1);
  expect(getFormOutput.formFields[0].label).toBe('Base Color');
  expect(getFormOutput.formFields[0].options).toEqual(newListSelectionOptions);
});

// fazer o caso de formulário não existe no GetFormTest
