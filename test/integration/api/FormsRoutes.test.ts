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

test('Should create a form', async () => {
  const body = {
    name: 'Seminary',
    fields: [
      {
        type: 'Date',
        label: 'Started At',
      },
      {
        type: 'Checkbox',
        label: 'Topics Studied',
        options: ['Anatomy', 'Stress', 'Faith', 'Creed'],
      },
    ],
  };
  const res = await app.post('/form').send(body);
  expect(res.statusCode).toEqual(201);
  expect(typeof res.body.formId).toBe('number');
  expect(res.body.name).toBe('Seminary');

  const formData = await formDAO.getForm('Seminary');
  expect(formData.id).toBe(res.body.formId);
});

test('Should not create a form', async () => {
  const body = { name: 'Seminary' };
  const res = await app.post('/form').send(body);
  expect(res.statusCode).toBe(400);
  expect(res.body).toBe('Error!! List of form fields cannot be empty');
});

test('Should update a form name', async () => {
  const form = new Form('Subscription');
  const createFormOutput = await formRepository.save(form);

  const requestBody = {
    name: 'Subscription',
    newName: 'Performance',
  };
  const res = await app.patch('/form').send(requestBody);
  expect(res.statusCode).toBe(204);

  const formData = await formDAO.getForm('Performance');
  expect(formData.id).toBe(createFormOutput.id);
});

test('Should get a form', async () => {
  const form = new Form('Subscription');
  form.addField(new FormField('Long Text', 'Address'));
  const createFormOutput = await formRepository.save(form);

  const body = {
    name: 'Subscription',
  };

  const res = await app.get('/form').send(body);
  expect(res.statusCode).toEqual(200);
  expect(res.body.form.id).toBe(createFormOutput.id);
  expect(res.body.formFields).toBeInstanceOf(Array);
  expect(res.body.formFields).toHaveLength(1);
  expect(res.body.formFields[0].label).toBe('Address');
});

test('Should get the forms', async () => {
  const form1 = new Form('Environment Management Map');
  form1.addField(new FormField('Short Text', 'Area Code'));
  form1.addField(new FormField('Date', 'Last review'));
  const form2 = new Form('Land Withdraw');
  form2.addField(new FormField('Date', 'Monitoring Starting Date'));
  form2.addField(new FormField('List Selection', 'Land Type', ['Tundra', 'Desert', 'Grasslands']));
  await formRepository.save(form1);
  await formRepository.save(form2);

  const res = await app.get('/forms').send();
  expect(res.body.forms).toHaveLength(2);
  expect(res.body.forms[0].formFields).toHaveLength(2);
  expect(res.body.forms[1].formFields).toHaveLength(2);
});

test('Should delete form', async () => {
  const form = new Form('Land Withdraw');
  form.addField(new FormField('Date', 'Monitoring Starting Date'));
  form.addField(new FormField('List Selection', 'Land Type', ['Tundra', 'Desert', 'Grasslands']));
  const formData1 = await formRepository.save(form);

  const body = {
    formId: formData1.id,
  };
  const res = await app.delete('/form').send(body);
  expect(res.statusCode).toEqual(204);

  const formData2 = await formDAO.getForm('Land Withdraw');
  expect(formData2).toBeUndefined();
});
