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
import UpdateRegistry from '../../src/application/usecase/UpdateRegistry';
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
let updateRegistry: UpdateRegistry;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formDAO = new FormDAODatabase(databaseConnection);
  registryDAO = new RegistryDAODatabase(databaseConnection);
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
  registryRepositoryDatabase = new RegistryRepositoryDatabase(databaseConnection);
  createForm = new CreateForm(formRepositoryDatabase);
  createRegistry = new CreateRegistry(registryRepositoryDatabase, formDAO);
  updateRegistry = new UpdateRegistry(registryRepositoryDatabase);
  getRegistries = new GetRegistries(registryDAO);
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
  const updateRegistryInput = new UpdateRegistryInput(createRegistryOutput.registryId, [
    { fieldLabel: 'Color', newValue: 'Green' },
  ]);
  await updateRegistry.execute(updateRegistryInput);
  const getRegistriesInput = new GetRegistriesInput(createFormOutput.formId);
  const getRegistriesOutput = await getRegistries.execute(getRegistriesInput);
  expect(getRegistriesOutput.output[0].values['Color']).toBe('Green');
});

test('Should update two registries, update two fields in each', async () => {
  const dateField = new FormField('Date', 'Started At');
  const checkboxField = new FormField('Checkbox', 'Topics Studied', [
    'Anatomy',
    'Stress',
    'Faith',
    'Creed',
  ]);
  const createFormInput = new CreateFormInput('Seminary', [dateField, checkboxField]);
  const createFormOutput = await createForm.execute(createFormInput);
  const startDate1 = new Date('2021-08-15T00:00:00');
  const checkedOptions1 = ['Stress', 'Faith'];
  const createRegistryInput1 = new CreateRegistryInput('Seminary', createFormOutput.formId, [
    startDate1,
    checkedOptions1,
  ]);
  const checkedOptions2 = ['Anatomy', 'Stress'];
  const startDate2 = new Date('2021-12-01T00:00:00');
  const createRegistryInput2 = new CreateRegistryInput('Subscription', createFormOutput.formId, [
    startDate2,
    checkedOptions2,
  ]);
  const createRegistryOutput1 = await createRegistry.execute(createRegistryInput1);
  const createRegistryOutput2 = await createRegistry.execute(createRegistryInput2);
  const newStartDate1 = new Date(startDate1.getTime() + 24 * 60 * 60 * 1000);
  const newCheckedOptions1 = checkedOptions1.concat(['Creed']);
  const updateRegistryInput1 = new UpdateRegistryInput(createRegistryOutput1.registryId, [
    { fieldLabel: 'Started At', newValue: newStartDate1 },
    { fieldLabel: 'Topics Studied', newValue: newCheckedOptions1 },
  ]);
  const newStartDate2 = new Date(startDate2.setDate(startDate2.getDate() + 1));
  const newCheckedOptions2 = checkedOptions2.splice(0, 1).concat(['Faith']);
  const updateRegistryInput2 = new UpdateRegistryInput(createRegistryOutput2.registryId, [
    { fieldLabel: 'Started At', newValue: newStartDate2 },
    { fieldLabel: 'Topics Studied', newValue: newCheckedOptions2 },
  ]);
  await updateRegistry.execute(updateRegistryInput1);
  await updateRegistry.execute(updateRegistryInput2);
  const getRegistries = new GetRegistries(registryDAO);
  const getRegistriesInput = new GetRegistriesInput(createFormOutput.formId);
  const getRegistriesOutput = await getRegistries.execute(getRegistriesInput);
  const registry1 = getRegistriesOutput.output.find(
    (registry) => registry.registryData.registryId === createRegistryOutput1.registryId
  );
  const registry2 = getRegistriesOutput.output.find(
    (registry) => registry.registryData.registryId === createRegistryOutput2.registryId
  );
  if (!registry1 || !registry2) throw new Error('Created registries could not be retrieved!');
  //@ts-ignore
  expect(new Date(registry1.values['Started At']).getTime()).toEqual(newStartDate1.getTime());
  expect(registry1.values['Topics Studied']).toEqual(`{${newCheckedOptions1.join(',')}}`);
  //@ts-ignore
  expect(new Date(registry2.values['Started At']).getTime()).toEqual(newStartDate2.getTime());
  expect(registry2.values['Topics Studied']).toEqual(`{${newCheckedOptions2.join(',')}}`);
});
