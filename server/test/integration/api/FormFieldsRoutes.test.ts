import { wipeDatabaseForms } from './utils/wipeDatabseForms';
import Router from '../../../src/infra/http/Router';
import ExpressAdapter from '../../../src/infra/http/ExpressAdapter';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import request from 'supertest';
import DatabaseConnection from '../../../src/infra/database/DatabaseConnection';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import Form from '../../../src/domain/entitites/Form';
import FormDAODatabase from '../../../src/infra/dao/FormDAODatabase';
import FormField from '../../../src/domain/entitites/FormField';
import FormRepository from '../../../src/domain/repository/FormRepository';
import FormDAO from '../../../src/application/query/FormDAO';

let router: Router;
let databaseConnection: DatabaseConnection;
let formRepository: FormRepository;
let formDAO: FormDAO;
let app: any;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepository = new FormRepositoryDatabase(databaseConnection);
  formDAO = new FormDAODatabase(databaseConnection);
  router = new Router(new ExpressAdapter(), databaseConnection);
  app = request(router.http.getApp());
});

afterEach(async () => {
  await wipeDatabaseForms(formDAO, formRepository);
});

test('Should update a form field', async () => {
  const form = new Form('Paint');
  const oldListSelectionOptions = ['Yellow', 'Green', 'Blue'];
  const fieldIndex = 0;
  const field = new FormField('List Selection', 'Color', oldListSelectionOptions, fieldIndex);
  form.addField(field);
  const formData = await formRepository.save(form);

  const newListSelectionOptions = ['Yellow', 'Green', 'Blue', 'Marsala'];
  const body = {
    fieldLabel: 'Color',
    formId: formData.id,
    newType: 'List Selection',
    newLabel: 'Base Color',
    newIndex: fieldIndex,
    newOptions: newListSelectionOptions,
  };
  const res = await app.patch('/formField').send(body);
  expect(res.statusCode).toBe(204);

  const formFieldsData = await formDAO.getFormFields(formData.id);
  expect(formFieldsData[0].label).toBe('Base Color');
  expect(formFieldsData[0].options).toEqual(newListSelectionOptions);
});

test('Should delete a form field', async () => {
  const form = new Form('Paint');
  const oldListSelectionOptions = ['Yellow', 'Green', 'Blue'];
  const field = new FormField('List Selection', 'Color', oldListSelectionOptions);
  form.addField(field);
  const formData = await formRepository.save(form);

  const body = {
    formId: formData.id,
    fieldLabel: 'Color',
  };

  const res = await app.delete('/formField').send(body);
  expect(res.statusCode).toBe(204);

  const formFieldsData = await formDAO.getFormFields(formData.id);
  expect(formFieldsData).toHaveLength(0);
});
