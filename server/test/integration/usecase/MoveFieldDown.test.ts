import FormField from '../../../src/domain/entitites/FormField';
import CreateFormInput from '../../../src/application/dto/CreateFormInput';
import CreateForm from '../../../src/application/usecase/CreateForm';
import MoveFieldDown from '../../../src/application/usecase/MoveFieldDown';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import FormDAO from '../../../src/application/query/FormDAO';
import FormDAODatabase from '../../../src/infra/dao/FormDAODatabase';
import MoveFieldDownInput from '../../../src/application/dto/MoveFieldDownInput';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;
let createForm: CreateForm;
let moveFieldDown: MoveFieldDown;
let formDAO: FormDAO;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
  moveFieldDown = new MoveFieldDown(formRepositoryDatabase);
  formDAO = new FormDAODatabase(databaseConnection);
});

test("Should move a field down, meaning exchanging it's index with the field with posterior index", async () => {
  const fields = [
    new FormField('Short Text', 'Number of patches', undefined, 0),
    new FormField('Short Text', 'Name', undefined, 1),
  ];
  const createFormInput = new CreateFormInput('Stock Analysis', fields);
  const createFormOutput = await createForm.execute(createFormInput);
  const moveFieldDownInput = new MoveFieldDownInput(createFormOutput.formId, 0);
  const moveFieldDownOutput = await moveFieldDown.execute(moveFieldDownInput);
  const formFields = await formDAO.getFormFields(createFormOutput.formId);
  const numberOfPatchesFormField = formFields[0];
  expect(numberOfPatchesFormField.index).toBe(1);
  const nameFormField = formFields[1];
  expect(nameFormField.index).toBe(0);
});

// test('Should not move a field down if it is the last one', async () => {});
