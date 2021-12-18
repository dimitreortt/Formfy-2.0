import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
});

test('Should delete fields from formId', async () => {
  const FORM_ID = 1;
  const fields = [
    {
      formId: FORM_ID,
      label: 'Color',
      type: 'Short Text',
    },
    {
      formId: FORM_ID,
      label: 'Darkness',
      type: 'Short Text',
    },
  ];
  for (const field of fields) {
    await databaseConnection.query(
      'insert into formfy.form_field (form_id, label, type) values ($1, $2, $3);',
      [field.formId, field.label, field.type, '']
    );
  }
  await formRepositoryDatabase.deleteFields(FORM_ID);
  const fieldsData = databaseConnection.query(
    'select * from formfy.form_field where form_id = $1;',
    [FORM_ID]
  );
  expect(fieldsData).toMatchObject({});
});

// fazer o caso de formulário não existe no GetFormTest
