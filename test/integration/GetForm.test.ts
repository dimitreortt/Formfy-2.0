import CreateForm from '../../src/application/usecase/CreateForm';
import CreateFormInput from '../../src/application/dto/CreateFormInput';
import GetForm from '../../src/application/query/GetForm';
import FormDAODatabase from '../../src/infra/dao/FormDAODatabase';
import GetFormInput from '../../src/application/dto/GetFormInput';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';
import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import FormField from '../../src/domain/entitites/FormField';

let createForm: CreateForm;
let formRepositoryDatabase: FormRepositoryDatabase;
let databaseConnection: any;
let getForm: GetForm;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  getForm = new GetForm(new FormDAODatabase(databaseConnection));
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
});

test('Should get a form from name', async () => {
  const createFormInput = new CreateFormInput('Subscription', []);
  const createFormOutput = await createForm.execute(createFormInput);
  const getFormInput = new GetFormInput('Subscription', createFormOutput.formId);
  const output = await getForm.execute(getFormInput);
  expect(output.form.name).toBe('Subscription');
});

test('Should get a form with two fields', async () => {
  const listSelectionOptions = ['Small', 'Big', 'Medium'];
  const fields = [
    new FormField('Short Text', 'Number of patches'),
    new FormField('List Selection', 'Type', ['Small', 'Big', 'Medium']),
  ];
  const createFormInput = new CreateFormInput('Stock Analysis', fields);
  const createFormOutput = await createForm.execute(createFormInput);
  const getFormInput = new GetFormInput('Stock Analysis', createFormOutput.formId);
  const output = await getForm.execute(getFormInput);
  expect(output.formFields).toHaveLength(2);
  expect(output.formFields[0].label).toBe('Number of patches');
  expect(output.formFields[1].label).toBe('Type');
  expect(output.formFields[1].options).toEqual(listSelectionOptions);
});
