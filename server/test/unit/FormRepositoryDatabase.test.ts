import { wipeDatabaseForms } from './../integration/api/utils/wipeDatabseForms';
import FormRepositoryDatabase from '../../src/infra/repository/database/FormRepositoryDatabase';
import DatabaseConnectionMock from '../mocks/DatabaseConnectionMock';
import FormDAO from '../../src/application/query/FormDAO';
import FormDAODatabase from '../../src/infra/dao/FormDAODatabase';

let databaseConnection: any;
let formRepository: FormRepositoryDatabase;
let formDAO: FormDAO;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepository = new FormRepositoryDatabase(databaseConnection);
  formDAO = new FormDAODatabase(databaseConnection);
});

afterEach(async () => {
  await wipeDatabaseForms(formDAO, formRepository);
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

test("Should swap a field's index with the field with previous index", async () => {
  const FORM_ID = 1;
  const firstFieldIndex = 0;
  const secondFieldIndex = 1;
  const fields = [
    {
      formId: FORM_ID,
      label: 'Color',
      type: 'Short Text',
      index: firstFieldIndex,
    },
    {
      formId: FORM_ID,
      label: 'Darkness',
      type: 'Short Text',
      index: secondFieldIndex,
    },
  ];
  for (const field of fields) {
    await databaseConnection.query(
      'insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);',
      [field.formId, field.label, field.type, field.index]
    );
  }

  await formRepository.swapIndexes(FORM_ID, secondFieldIndex);

  const fieldData = await databaseConnection.query(
    'select * from formfy.form_field where form_id = $1 and index = $2;',
    [FORM_ID, secondFieldIndex]
  );
  expect(fieldData.label).toBe('Color');

  const fieldDat2 = await databaseConnection.query(
    'select * from formfy.form_field where form_id = $1 and index = $2;',
    [FORM_ID, firstFieldIndex]
  );
  expect(fieldData.label).toBe('Darkness');
});
//fazer o caso de formulário não existe no GetFormTest
