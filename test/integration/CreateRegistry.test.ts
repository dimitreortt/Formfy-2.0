import CreateForm from '../../src/application/usecase/CreateForm';
import CreateRegistry from '../../src/application/usecase/CreateRegistry';
import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';
import CreateFormInput from '../../src/application/dto/CreateFormInput';
import CreateRegistryInput from '../../src/application/dto/CreateRegistryInput';
import Form from '../../src/domain/entitites/Form';
import FormField from '../../src/domain/entitites/FormField';
import RegistryRepositoryDatabase from '../../src/infra/repository/database/RegistryRepositoryDatabase';
import FormDAODatabase from '../../src/infra/dao/FormDAODatabase';

let databaseConnection: any;
let formId: number;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
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
  const createRegistryInput = new CreateRegistryInput('Subscription', formId, [
    'Brazil',
    checkBoxInputs,
  ]);
  const registryRepositoryDatabase = new RegistryRepositoryDatabase(databaseConnection);
  const formDAO = new FormDAODatabase(databaseConnection);
  const createRegistry = new CreateRegistry(registryRepositoryDatabase, formDAO);
  const output = await createRegistry.execute(createRegistryInput);

  expect(typeof output.registryId).toBe('number');
});

test('Should throw error when trying to create a registry with input incompatible with formfields types', () => {});
