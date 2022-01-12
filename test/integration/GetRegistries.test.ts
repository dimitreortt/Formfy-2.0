import CreateForm from '../../src/application/usecase/CreateForm';
import CreateRegistry from '../../src/application/usecase/CreateRegistry';
import CreateFormInput from '../../src/application/dto/CreateFormInput';
import FormDAODatabase from '../../src/infra/dao/FormDAODatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';
import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import RegistryRepositoryDatabase from '../../src/infra/repository/database/RegistryRepositoryDatabase';
import FormField from '../../src/domain/entitites/FormField';
import CreateRegistryInput from '../../src/application/dto/CreateRegistryInput';
import GetRegistriesInput from '../../src/application/dto/GetRegistriesInput';
import RegistryDAODatabase from '../../src/infra/dao/RegistryDAODatabase';
import RegistryDAO from '../../src/application/query/RegistryDAO';
import GetRegistries from '../../src/application/query/GetRegistries';

let createForm: CreateForm;
let formRepositoryDatabase: FormRepositoryDatabase;
let databaseConnection: any;
let createRegistry: CreateRegistry;
let formId: number;
let registryDAO: RegistryDAO;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
  const registryRepositoryDatabase = new RegistryRepositoryDatabase(databaseConnection);
  const formDAO = new FormDAODatabase(databaseConnection);
  createRegistry = new CreateRegistry(registryRepositoryDatabase, formDAO);
  const listSelectionOptions = ['Small', 'Big', 'Medium'];
  const fields = [
    new FormField('Short Text', 'Number of patches'),
    new FormField('List Selection', 'Type', listSelectionOptions),
  ];
  const createFormInput = new CreateFormInput('Stock Analysis', fields);
  const createFormOutput = await createForm.execute(createFormInput);
  formId = createFormOutput.formId;
  registryDAO = new RegistryDAODatabase(databaseConnection);
});

test('Should get registries from form id', async () => {
  const createRegistryInput1 = new CreateRegistryInput('Stock Analysis', formId, ['5', 'Small']);
  const createRegistryInput2 = new CreateRegistryInput('Stock Analysis', formId, ['9', 'Big']);
  await createRegistry.execute(createRegistryInput1);
  await createRegistry.execute(createRegistryInput2);
  const getRegistries = new GetRegistries(registryDAO);
  const getRegistriesInput = new GetRegistriesInput(formId);
  const getRegistriesOutput = await getRegistries.execute(getRegistriesInput);
  expect(getRegistriesOutput.output).toHaveLength(2);
  expect(getRegistriesOutput.output[0].values['Number of patches']).toEqual('5');
  expect(getRegistriesOutput.output[0].values['Type']).toEqual('Small');
  expect(getRegistriesOutput.output[1].values['Number of patches']).toEqual('9');
  expect(getRegistriesOutput.output[1].values['Type']).toEqual('Big');
});
