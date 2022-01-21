import CreateForm from '../../../src/application/usecase/CreateForm';
import CreateRegistry from '../../../src/application/usecase/CreateRegistry';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import CreateFormInput from '../../../src/application/dto/CreateFormInput';
import CreateRegistryInput from '../../../src/application/dto/CreateRegistryInput';
import FormField from '../../../src/domain/entitites/FormField';
import RegistryRepositoryDatabase from '../../../src/infra/repository/database/RegistryRepositoryDatabase';
import FormDAODatabase from '../../../src/infra/dao/FormDAODatabase';
import FormDAO from '../../../src/application/query/FormDAO';

let databaseConnection: any;
let formId: number;
let registryRepositoryDatabase: RegistryRepositoryDatabase;
let formDAO: FormDAO;
let createRegistry: CreateRegistry;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  registryRepositoryDatabase = new RegistryRepositoryDatabase(databaseConnection);
  formDAO = new FormDAODatabase(databaseConnection);
  createRegistry = new CreateRegistry(registryRepositoryDatabase, formDAO);

  const formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  const createForm = new CreateForm(formRepositoryDatabase);
  const listSelectionOptions = ['Brazil', 'England'];
  const checkBoxOptions = ['Big', 'Crispy', 'Yellow', 'Melancholic'];
  const fields = [
    new FormField('List Selection', 'Country', listSelectionOptions),
    new FormField('Checkbox', 'Fixtures', checkBoxOptions),
  ];
  const createFormInput = new CreateFormInput('Subscription', fields);
  const createFormOutput = await createForm.execute(createFormInput);
  formId = createFormOutput.formId;
});

test('Should create a registry', async () => {
  const checkBoxInputs = ['Big', 'Yellow'];
  const createRegistryInput = new CreateRegistryInput(formId, ['Brazil', checkBoxInputs]);
  const output = await createRegistry.execute(createRegistryInput);
  expect(typeof output.registryId).toBe('number');
});

test('Should throw error when trying to create a registry with input incompatible with formfields types', async () => {
  const wrongCheckBoxInputs = 'Yellow';
  const createRegistryInput1 = new CreateRegistryInput(formId, ['Brazil', wrongCheckBoxInputs]);
  await expect(async () => {
    await createRegistry.execute(createRegistryInput1);
  }).rejects.toThrow(new Error('Invalid field value type in registry creation'));
});
