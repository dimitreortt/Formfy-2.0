import { RegistryFieldChange } from './../../../src/application/usecase/types/RegistryFieldChange';
import { wipeDatabaseRegistries } from './utils/wipeDatabaseRegistries';
import { wipeDatabaseForms } from './utils/wipeDatabseForms';
import FormRepository from '../../../src/domain/repository/FormRepository';
import RegistryRepository from '../../../src/domain/repository/RegistryRepository';
import ExpressAdapter from '../../../src/infra/http/ExpressAdapter';
import DatabaseConnection from '../../../src/infra/database/DatabaseConnection';
import Router from '../../../src/infra/http/Router';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import RegistryRepositoryDatabase from '../../../src/infra/repository/database/RegistryRepositoryDatabase';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import RegistryDAO from '../../../src/application/query/RegistryDAO';
import RegistryDAODatabase from '../../../src/infra/dao/RegistryDAODatabase';
import Form from '../../../src/domain/entitites/Form';
import FormField from '../../../src/domain/entitites/FormField';
import request from 'supertest';
import Registry from '../../../src/domain/entitites/Registry';
import FormDAO from '../../../src/application/query/FormDAO';
import FormDAODatabase from '../../../src/infra/dao/FormDAODatabase';

let router: Router;
let databaseConnection: DatabaseConnection;
let formRepository: FormRepository;
let registryRepository: RegistryRepository;
let registryDAO: RegistryDAO;
let formDAO: FormDAO;
let app: any;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepository = new FormRepositoryDatabase(databaseConnection);
  registryRepository = new RegistryRepositoryDatabase(databaseConnection);
  registryDAO = new RegistryDAODatabase(databaseConnection);
  formDAO = new FormDAODatabase(databaseConnection);
  router = new Router(new ExpressAdapter(), databaseConnection);
  app = request(router.http.getApp());
});

afterEach(async () => {
  await wipeDatabaseForms(formDAO, formRepository);
  await wipeDatabaseRegistries(formDAO, registryDAO, registryRepository);
});

test('Should create a registry', async () => {
  const form = new Form('Environment Management Map');
  form.addField(new FormField('Short Text', 'Area Code'));
  form.addField(new FormField('Date', 'Last review'));
  const formData = await formRepository.save(form);

  const areaCode = 'JDAKSDNKJ319928391';
  const lastReviewDate = new Date('2000-06-06');
  const body = {
    formId: formData.id,
    values: [areaCode, lastReviewDate],
  };
  const res = await app.post('/registry').send(body);
  expect(res.statusCode).toBe(201);
  expect(typeof res.body.registryId).toBe('number');

  const registryFieldsData = await registryDAO.getRegistryFields(res.body.registryId);
  expect(registryFieldsData).toBeInstanceOf(Array);
  expect(registryFieldsData).toHaveLength(2);
});

test('Should get the registries', async () => {
  const form = new Form('Stock Analysis');
  const listSelectionOptions = ['Small', 'Big', 'Medium'];
  const fields = [
    new FormField('Short Text', 'Number of patches'),
    new FormField('List Selection', 'Type', listSelectionOptions),
  ];
  for (const field of fields) {
    form.addField(field);
  }
  const formData = await formRepository.save(form);

  const registry1 = new Registry(fields, ['5', 'Small']);
  const registry2 = new Registry(fields, ['9', 'Big']);
  await registryRepository.save(registry1, formData.id);
  await registryRepository.save(registry2, formData.id);

  const body = { formId: formData.id };
  const res = await app.get('/registries').send(body);
  expect(res.body.registries).toBeInstanceOf(Array);
  expect(res.body.registries).toHaveLength(2);
  expect(res.body.registries[0].values['Number of patches']).toBe('5');
  expect(res.body.registries[0].values['Type']).toBe('Small');
  expect(res.body.registries[1].values['Number of patches']).toBe('9');
  expect(res.body.registries[1].values['Type']).toBe('Big');
});

test('Should update a registry', async () => {
  const form = new Form('Stock Analysis');
  const listSelectionOptions = ['Small', 'Big', 'Medium'];
  const fields = [
    new FormField('Short Text', 'Number of patches'),
    new FormField('List Selection', 'Type', listSelectionOptions),
  ];
  for (const field of fields) {
    form.addField(field);
  }
  const formData = await formRepository.save(form);

  const registry = new Registry(fields, ['5', 'Small']);
  const registryData = await registryRepository.save(registry, formData.id);

  const changes: RegistryFieldChange[] = [
    { fieldLabel: 'Number of patches', newValue: '39' },
    { fieldLabel: 'Type', newValue: 'Small' },
  ];

  const body = { registryId: registryData.registryId, changes };
  const res = await app.patch('/registry').send(body);
  expect(res.statusCode).toBe(204);

  const registryFieldsData = await registryDAO.getRegistryFields(registryData.registryId);
  expect(registryFieldsData).toBeInstanceOf(Array);
  expect(registryFieldsData).toHaveLength(2);
  expect(registryFieldsData[0].value).toBe('39');
  expect(registryFieldsData[1].value).toBe('Small');
});

test('Should delete a registry', async () => {
  const form = new Form('Stock Analysis');
  const field = new FormField('Short Text', 'Number of patches');
  form.addField(field);
  const formData = await formRepository.save(form);

  const registry = new Registry([field], ['5', 'Small']);
  const registryData = await registryRepository.save(registry, formData.id);

  const body = { registryId: registryData.registryId };
  const res = await app.delete('/registry').send(body);
  expect(res.statusCode).toBe(204);

  const registries = await registryDAO.getRegistries(formData.id);
  expect(registries).toEqual([]);
  const registryFieldsData = await registryDAO.getRegistryFields(registryData.registryId);
  expect(registryFieldsData).toEqual([]);
});
