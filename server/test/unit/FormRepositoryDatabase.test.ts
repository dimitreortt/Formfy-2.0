import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';

let databaseConnection: any;
let formRepository: FormRepositoryDatabase;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepository = new FormRepositoryDatabase(databaseConnection);
});

test('Should delete fields from db based on formId', async () => {
  const FORM_ID = 1;
  const fields = [
    {
      formId: FORM_ID,
      label: 'Color',
      type: 'Short Text',
      index: 0,
    },
    {
      formId: FORM_ID,
      label: 'Darkness',
      type: 'Short Text',
      index: 1,
    },
  ];
  for (const field of fields) {
    await databaseConnection.query(
      'insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);',
      [field.formId, field.label, field.type, field.index]
    );
  }
  await formRepository.deleteFields(FORM_ID);
  const fieldsData = databaseConnection.query(
    'select * from formfy.form_field where form_id = $1;',
    [FORM_ID]
  );
  expect(fieldsData).toMatchObject({});
});

test('Should return the correct count in form_field table', async () => {
  const FORM_ID = 2;
  const field = {
    formId: FORM_ID,
    label: 'Color',
    type: 'Short Text',
    index: 0,
  };
  await databaseConnection.query(
    'insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);',
    [field.formId, field.label, field.type, field.index]
  );

  const ANOTHER_FORM_ID = 5;
  const anotherField = {
    formId: ANOTHER_FORM_ID,
    label: 'Darkness',
    type: 'Short Text',
    index: 0,
  };
  await databaseConnection.query(
    'insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);',
    [anotherField.formId, anotherField.label, anotherField.type, anotherField.index]
  );

  const count1 = await formRepository.formFieldsCount(FORM_ID);
  expect(count1).toBe(1);

  const count2 = await formRepository.formFieldsCount(ANOTHER_FORM_ID);
  expect(count2).toBe(1);

  const NON_EXISTANT_FORM_ID = 19230;
  const count3 = await formRepository.formFieldsCount(NON_EXISTANT_FORM_ID);
  expect(count3).toBe(0);
});

//fazer o caso de formulário não existe no GetFormTest
