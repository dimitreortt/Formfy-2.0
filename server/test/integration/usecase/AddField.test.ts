import { AddFormField } from "./../../../src/application/usecase/AddFormField";
import { AddFormFieldInput } from "./../../../src/application/dto/AddFormFieldInput";
import { FormFieldType } from "./../../../../client/src/domain/FormField";
import CreateFormInput from "../../../src/application/dto/CreateFormInput";
import GetFormInput from "../../../src/application/dto/GetFormInput";
import FormDAO from "../../../src/application/query/FormDAO";
import GetForm from "../../../src/application/query/GetForm";
import CreateForm from "../../../src/application/usecase/CreateForm";
import FormField from "../../../src/domain/entitites/FormField";
import FormRepository from "../../../src/domain/repository/FormRepository";
import FormDAODatabase from "../../../src/infra/dao/FormDAODatabase";
import DatabaseConnection from "../../../src/infra/database/DatabaseConnection";
import FormRepositoryDatabase from "../../../src/infra/repository/database/FormRepositoryDatabase";
import DatabaseConnectionMock from "../../mocks/DatabaseConnectionMock";

let formRepository: FormRepository;
let formDAO: FormDAO;
let databaseConnection: DatabaseConnection;

beforeAll(async () => {
  databaseConnection = await new DatabaseConnectionMock().build();
  formRepository = new FormRepositoryDatabase(databaseConnection);
  formDAO = new FormDAODatabase(databaseConnection);
});

test("Should add a field", async () => {
  const createForm = new CreateForm(formRepository);
  const createFormInput = new CreateFormInput("Subscription", []);
  const { formId } = await createForm.execute(createFormInput);

  const fieldType: FormFieldType = "Short Text";
  const fieldLabel = "Name";
  const field = new FormField(fieldType, fieldLabel);

  const addFormField = new AddFormField(formRepository);
  const addFormFieldInput = new AddFormFieldInput(formId, field);
  await addFormField.execute(addFormFieldInput);

  const getForm = new GetForm(formDAO);
  const getFormInput = new GetFormInput("Subscription");
  const getFormOutput = await getForm.execute(getFormInput);

  expect(getFormOutput.formFields).toHaveLength(1);
  expect(getFormOutput.formFields[0].label).toBe(fieldLabel);
  expect(getFormOutput.formFields[0].type).toBe(fieldType);
});
