import CreateFormInput from '../../src/application/dto/CreateFormInput';
import CreateForm from '../../src/application/usecase/CreateForm';
import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';
import FormField from '../../src/domain/entitites/FormField';
import FormDAODatabase from '../../src/infra/dao/FormDAODatabase';
import CreateRegistryInput from '../../src/application/dto/CreateRegistryInput';
import RegistryRepositoryDatabase from '../../src/infra/repository/database/RegistryRepositoryDatabase';
import FormDAO from '../../src/application/query/FormDAO';
import CreateRegistry from '../../src/application/usecase/CreateRegistry';
import GetRegistries from '../../src/application/query/GetRegistries';
import RegistryDAO from '../../src/application/query/RegistryDAO';
import RegistryDAODatabase from '../../src/infra/dao/RegistryDAODatabase';
import GetRegistriesInput from '../../src/application/dto/GetRegistriesInput';
import UpdateRegistryInput from '../../src/application/dto/UpdateRegistryInput';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;
let createForm: CreateForm;
let registryRepositoryDatabase: RegistryRepositoryDatabase;
let formDAO: FormDAO;
let createRegistry: CreateRegistry;
let getRegistries: GetRegistries;
let registryDAO: RegistryDAO;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
  registryRepositoryDatabase = new RegistryRepositoryDatabase(databaseConnection);
  formDAO = new FormDAODatabase(databaseConnection);
  createRegistry = new CreateRegistry(registryRepositoryDatabase, formDAO);
  registryDAO = new RegistryDAODatabase(databaseConnection);
});

test('Should update a registry field, change chosen color from Yellow to Green in list selection', async () => {
  const listSelectionOptions = ['Yellow', 'Green', 'Blue', 'Marsala'];
  const field = new FormField('List Selection', 'Color', listSelectionOptions);
  const createFormInput = new CreateFormInput('Paint', [field]);
  const createFormOutput = await createForm.execute(createFormInput);
  const createRegistryInput = new CreateRegistryInput('Subscription', createFormOutput.formId, [
    'Yellow',
  ]);
  const createRegistryOutput = await createRegistry.execute(createRegistryInput);

  const updateRegistry = new UpdateRegistry();
  const updateRegistryInput = new UpdateRegistryInput(createRegistryOutput.registryId, [
    { fieldLabel: 'Color', newValue: 'Green' },
  ]);
  await updateRegistry.execute(updateRegistryInput);

  const getRegistries = new GetRegistries(registryDAO);
  const getRegistriesInput = new GetRegistriesInput(createFormOutput.formId);
  const getRegistriesOutput = await getRegistries.execute(getRegistriesInput);
  expect(getRegistriesOutput.output[0].values['Color']).toBe('Green');
});

// fazer o caso de formulário não existe no GetFormTest
