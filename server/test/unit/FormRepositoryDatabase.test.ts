import { FieldType } from "./../../src/domain/Types";
import { wipeDatabaseForms } from "./../integration/api/utils/wipeDatabseForms";
import FormRepositoryDatabase from "../../src/infra/repository/database/FormRepositoryDatabase";
import DatabaseConnectionMock from "../mocks/DatabaseConnectionMock";
import FormDAO from "../../src/application/query/FormDAO";
import FormDAODatabase from "../../src/infra/dao/FormDAODatabase";
import FormField from "../../src/domain/entitites/FormField";

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

test("Should delete fields from db based on formId", async () => {
  const FORM_ID = 1;
  const fields = [
    {
      formId: FORM_ID,
      label: "Color",
      type: "Short Text",
      index: 0,
    },
    {
      formId: FORM_ID,
      label: "Darkness",
      type: "Short Text",
      index: 1,
    },
  ];
  for (const field of fields) {
    await databaseConnection.query(
      "insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);",
      [field.formId, field.label, field.type, field.index]
    );
  }
  await formRepository.deleteFields(FORM_ID);
  const fieldsData = databaseConnection.query(
    "select * from formfy.form_field where form_id = $1;",
    [FORM_ID]
  );
  expect(fieldsData).toMatchObject({});
});

test("Should return the correct count in form_field table", async () => {
  const FORM_ID = 2;
  const field = {
    formId: FORM_ID,
    label: "Color",
    type: "Short Text",
    index: 0,
  };
  await databaseConnection.query(
    "insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);",
    [field.formId, field.label, field.type, field.index]
  );

  const ANOTHER_FORM_ID = 5;
  const anotherField = {
    formId: ANOTHER_FORM_ID,
    label: "Darkness",
    type: "Short Text",
    index: 0,
  };
  await databaseConnection.query(
    "insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);",
    [
      anotherField.formId,
      anotherField.label,
      anotherField.type,
      anotherField.index,
    ]
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
      label: "Color",
      type: "Short Text",
      index: firstFieldIndex,
    },
    {
      formId: FORM_ID,
      label: "Darkness",
      type: "Short Text",
      index: secondFieldIndex,
    },
  ];
  for (const field of fields) {
    await databaseConnection.query(
      "insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);",
      [field.formId, field.label, field.type, field.index]
    );
  }

  await formRepository.swapIndexes(FORM_ID, secondFieldIndex, firstFieldIndex);

  const [fieldData] = await databaseConnection.query(
    "select * from formfy.form_field where form_id = $1 and index = $2;",
    [FORM_ID, secondFieldIndex]
  );
  expect(fieldData.label).toBe("Color");

  const [fieldData2] = await databaseConnection.query(
    "select * from formfy.form_field where form_id = $1 and index = $2;",
    [FORM_ID, firstFieldIndex]
  );
  expect(fieldData2.label).toBe("Darkness");
});

test("Should not swap a form_field with itself", async () => {
  const FORM_ID = 4;
  const fieldIndex = 0;
  const field = {
    formId: FORM_ID,
    label: "Color",
    type: "Short Text",
    index: fieldIndex,
  };
  await databaseConnection.query(
    "insert into formfy.form_field (form_id, label, type, index) values ($1, $2, $3, $4);",
    [field.formId, field.label, field.type, field.index]
  );

  await expect(async () => {
    await formRepository.swapIndexes(FORM_ID, fieldIndex, fieldIndex);
  }).rejects.toThrow();
});

test("Should add a form field", async () => {
  const FORM_ID = 6;
  const fieldType: FieldType = "Short Text";
  const fieldLabel = "Name";
  const field = new FormField(fieldType, fieldLabel);

  await formRepository.addField(FORM_ID, field);

  const [fieldData] = await databaseConnection.query(
    "select * from formfy.form_field where form_id = $1;",
    [FORM_ID]
  );

  expect(fieldData.label).toBe(fieldLabel);
  expect(fieldData.type).toBe(fieldType);
  expect(fieldData.index).toBe(0);
});
//fazer o caso de formul??rio n??o existe no GetFormTest
