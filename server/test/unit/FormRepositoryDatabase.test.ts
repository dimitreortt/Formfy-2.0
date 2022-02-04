import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';

let databaseConnection: any;
let formRepositoryDatabase: FormRepositoryDatabase;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepositoryDatabase = new FormRepositoryDatabase(databaseConnection);
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
  await formRepositoryDatabase.deleteFields(FORM_ID);
  const fieldsData = databaseConnection.query(
    'select * from formfy.form_field where form_id = $1;',
    [FORM_ID]
  );
  expect(fieldsData).toMatchObject({});
});

// test('Should return the correct count in form_field table', async () => {
//   const FORM_ID = 2;
//   const field = {
//     formId: FORM_ID,
//     label: 'Color',
//     type: 'Short Text',
//     index: 0,
//   };
//   await databaseConnection.query(
//     'insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);',
//     [field.formId, field.label, field.type, field.index]
//   );
// });
// fazer o caso de formulário não existe no GetFormTest
