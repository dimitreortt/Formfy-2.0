import FormRepository from '../../../src/domain/repository/FormRepository';
import ExpressAdapter from '../../../src/infra/http/ExpressAdapter';
import DatabaseConnection from '../../../src/infra/database/DatabaseConnection';
import Router from '../../../src/infra/http/Router';
import FormRepositoryDatabase from '../../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../../mocks/DatabaseConnectionMock';
import RegistryDAO from '../../../src/application/query/RegistryDAO';
import RegistryDAODatabase from '../../../src/infra/dao/RegistryDAODatabase';
import Form from '../../../src/domain/entitites/Form';
import FormField from '../../../src/domain/entitites/FormField';
import request from 'supertest';

let router: Router;
let databaseConnection: DatabaseConnection;
let formRepository: FormRepository;
let registryDAO: RegistryDAO;
let app: any;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepository = new FormRepositoryDatabase(databaseConnection);
  registryDAO = new RegistryDAODatabase(databaseConnection);
  router = new Router(new ExpressAdapter(), databaseConnection);
  app = request(router.http.getApp());
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
