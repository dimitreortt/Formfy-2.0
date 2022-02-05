import { wipeDatabaseForms } from './../api/utils/wipeDatabseForms';
import FormField from '../../../src/domain/entitites/FormField';
import CreateFormInput from '../../../src/application/dto/CreateFormInput';
import CreateForm from '../../../src/application/usecase/CreateForm';
import MoveFieldUp from '../../../src/application/usecase/MoveFieldUp';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import FormDAO from '../../../src/application/query/FormDAO';
import FormDAODatabase from '../../../src/infra/dao/FormDAODatabase';
import MoveFieldUpInput from '../../../src/application/dto/MoveFieldUpInput';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;
let createForm: CreateForm;
let moveFieldUp: MoveFieldUp;
let formDAO: FormDAO;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
  moveFieldUp = new MoveFieldUp(formRepositoryDatabase);
  formDAO = new FormDAODatabase(databaseConnection);
});

afterEach(async () => {
  await wipeDatabaseForms(formDAO, formRepositoryDatabase);
});

test("Should move a field up, meaning exchanging it's index with the field with previous index", async () => {
  const firstIndex = 0;
  const lastIndex = 1;
  const fields = [
    new FormField('Short Text', 'Number of patches', undefined, firstIndex),
    new FormField('Short Text', 'Name', undefined, lastIndex),
  ];
  const createFormInput = new CreateFormInput('Stock Analysis', fields);
  const createFormOutput = await createForm.execute(createFormInput);
  const moveFieldUpInput = new MoveFieldUpInput(createFormOutput.formId, lastIndex);
  const moveFieldUpOutput = await moveFieldUp.execute(moveFieldUpInput);
  const formFields = await formDAO.getFormFields(createFormOutput.formId);
  const numberOfPatchesFormField = formFields[0];
  expect(numberOfPatchesFormField.index).toBe(1);
  const nameFormField = formFields[1];
  expect(nameFormField.index).toBe(0);
});

test('Should not move a field up if it is the first one', async () => {
  const firstIndex = 0;
  const lastIndex = 1;
  const fields = [
    new FormField('Short Text', 'Number of patches', undefined, firstIndex),
    new FormField('Short Text', 'Name', undefined, lastIndex),
  ];
  const createFormInput = new CreateFormInput('Stock Analysis', fields);
  const createFormOutput = await createForm.execute(createFormInput);
  const moveFieldUpInput = new MoveFieldUpInput(createFormOutput.formId, firstIndex);
  await expect(async () => {
    await moveFieldUp.execute(moveFieldUpInput);
  }).rejects.toThrow();
});
