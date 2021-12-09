import CreateFormInput from '../../src/application/dto/CreateFormInput';
import CreateForm from '../../src/application/usecase/CreateForm';
import FormRepositoryMemory from '../../src/infra/repository/memory/FormRepositoryMemory';

test('Should create a form', async () => {
  const createFormInput = new CreateFormInput('Subscription');

  const formRepositoryMemory = new FormRepositoryMemory();

  const createForm = new CreateForm(formRepositoryMemory);
  const output = await createForm.execute(createFormInput);
  expect(output.name).toBe('Subscription');
});
