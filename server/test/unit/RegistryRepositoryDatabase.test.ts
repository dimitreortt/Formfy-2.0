import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';
import RegistryRepositoryDatabase from '../../src/infra/repository/database/RegistryRepositoryDatabase';
import Registry from '../../src/domain/entitites/Registry';
import Form from '../../src/domain/entitites/Form';
import FormField from '../../src/domain/entitites/FormField';
import DatabaseConnection from '../../src/infra/database/DatabaseConnection';

let databaseConnection: DatabaseConnection;
let registryRepositoryDatabase: RegistryRepositoryDatabase;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  registryRepositoryDatabase = new RegistryRepositoryDatabase(databaseConnection);
});

test('Should save a registry', async () => {
  const FORM_ID = 1;
  const listSelectionOptions = ['Brazil', 'England'];
  const checkBoxOptions = ['Big', 'Crispy', 'Yellow', 'Melancholic'];
  const fields = [
    new FormField('List Selection', 'Country', listSelectionOptions),
    new FormField('Checkbox', 'Fixtures', checkBoxOptions),
  ];
  const checkBoxInputs = ['Big', 'Yellow'];
  const registry = new Registry(fields, ['Brazil', checkBoxInputs]);
  await registryRepositoryDatabase.save(registry, FORM_ID);
  const registries = await databaseConnection.query('select * from formfy.registry;');
  expect(registries).toHaveLength(1);
  const [registryData] = registries;
  expect(registryData.form_id).toBe(FORM_ID);
  const registryFields = await databaseConnection.query(
    'select * from formfy.registry_field where registry_id = $1;',
    [registryData.id]
  );
  expect(registryFields).toHaveLength(2);
  expect(registryFields[0].label).toBe('Country');
  expect(registryFields[0].value).toBe('Brazil');
  expect(registryFields[1].label).toBe('Fixtures');
  expect(registryFields[1].value).toBe('{Big,Yellow}');
});

test('Should update a registry field', async () => {
  const REGISTRY_ID = 101;
  const oldSerialCode = '0101DPÇLPÇ1P1L';
  await databaseConnection.query(
    'insert into formfy.registry_field (registry_id, label, value) values ($1, $2, $3);',
    [REGISTRY_ID, 'Serial Code', oldSerialCode]
  );
  const newSerialCode = '6743682AHISUDA';
  await registryRepositoryDatabase.updateField(REGISTRY_ID, 'Serial Code', newSerialCode);
  const registryFields = await databaseConnection.query(
    'select * from formfy.registry_field where registry_id = $1;',
    [REGISTRY_ID]
  );
  expect(registryFields).toHaveLength(1);
  expect(registryFields[0].label).toEqual('Serial Code');
  expect(registryFields[0].value).toEqual(newSerialCode);
});
