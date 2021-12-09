import CreateForm from '../../src/application/usecase/CreateForm';
import CreateFormInput from '../../src/application/dto/CreateFormInput';
import FormRepositoryMemory from '../../src/infra/repository/memory/FormRepositoryMemory';
import GetForm from '../../src/application/query/GetForm';
import FormDAODatabase from '../../src/infra/dao/FormDAODatabase';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';

let createForm: CreateForm;
let createFormInput: CreateFormInput;

beforeEach(() => {
  createFormInput = new CreateFormInput('Subscription');
  const formRepositoryMemory = new FormRepositoryMemory();
  createForm = new CreateForm(formRepositoryMemory);
});

test('Should get a form from name', async () => {
  await createForm.execute(createFormInput);
  const getForm = new GetForm(new FormDAODatabase(new DatabaseConnectionAdapter()));
});
