import CreateFormInput from '../../../src/application/dto/CreateFormInput';
import CreateForm from '../../../src/application/usecase/CreateForm';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import FormField from '../../../src/domain/entitites/FormField';
import FormDAODatabase from '../../../src/infra/dao/FormDAODatabase';
import GetRegistries from '../../../src/application/query/GetRegistries';
import RegistryRepositoryDatabase from '../../../src/infra/repository/database/RegistryRepositoryDatabase';
import RegistryDAODatabase from '../../../src/infra/dao/RegistryDAODatabase';
import GetRegistriesInput from '../../../src/application/dto/GetRegistriesInput';
import CreateRegistry from '../../../src/application/usecase/CreateRegistry';
import CreateRegistryInput from '../../../src/application/dto/CreateRegistryInput';
import DeleteRegistryInput from '../../../src/application/dto/DeleteRegistryInput';
import DeleteRegistry from '../../../src/application/usecase/DeleteRegistry';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;
let createForm: CreateForm;
let getRegistries: GetRegistries;
let deleteRegistry: DeleteRegistry;
let registryRepositoryDatabase: RegistryRepositoryDatabase;
let createRegistry: CreateRegistry;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
  registryRepositoryDatabase = new RegistryRepositoryDatabase(databaseConnection);
  deleteRegistry = new DeleteRegistry(registryRepositoryDatabase);
  const registryDAO = new RegistryDAODatabase(databaseConnection);
  getRegistries = new GetRegistries(registryDAO);
  const formDAO = new FormDAODatabase(databaseConnection);
  createRegistry = new CreateRegistry(registryRepositoryDatabase, formDAO);
});

test('Should delete a registry', async () => {
  const field = new FormField('List Selection', 'Color', [
    'Yellow',
    'Green',
    'Blue',
    'Cyan',
    'Cobalt',
  ]);
  const createFormInput = new CreateFormInput('Paint', [field]);
  const createFormOutput = await createForm.execute(createFormInput);
  const createRegistryInput1 = new CreateRegistryInput(createFormOutput.formId, ['Cyan']);
  const createRegistryInput2 = new CreateRegistryInput(createFormOutput.formId, ['Cobalt']);
  const createRegistryOutput1 = await createRegistry.execute(createRegistryInput1);
  const createRegistryOutput2 = await createRegistry.execute(createRegistryInput2);
  const deleteRegistryInput1 = new DeleteRegistryInput(createRegistryOutput1.registryId);
  await deleteRegistry.execute(deleteRegistryInput1);
  const getRegistriesInput = new GetRegistriesInput(createFormOutput.formId);
  const getRegistriesOutput1 = await getRegistries.execute(getRegistriesInput);
  expect(getRegistriesOutput1.output).toHaveLength(1);
  expect(getRegistriesOutput1.output[0].values['Color']).toBe('Cobalt');
  const deleteRegistryInput2 = new DeleteRegistryInput(createRegistryOutput2.registryId);
  await deleteRegistry.execute(deleteRegistryInput2);
  const getRegistriesOutput2 = await getRegistries.execute(getRegistriesInput);
  expect(getRegistriesOutput2.output).toHaveLength(0);
});

// fazer o caso de formulário não existe no GetFormTest
