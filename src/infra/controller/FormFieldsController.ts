import DatabaseConnection from '../database/DatabaseConnection';
import DeleteForm from '../../application/usecase/DeleteForm';
import FormRepositoryDatabase from '../repository/database/FormRepositoryDatabase';
import UpdateField from '../../application/usecase/UpdateField';
import UpdateFieldInput from '../../application/dto/UpdateFieldInput';

export default class FormFieldsController {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async updateField(params: any, body: any) {
    const updateField = new UpdateField(new FormRepositoryDatabase(this.databaseConnection));

    const updateFieldInput = new UpdateFieldInput(
      body.label,
      body.formId,
      body.newType,
      body.newLabel,
      body.newOptions
    );
    const output = await updateField.execute(updateFieldInput);
    return { status: 204, output };
  }

  async deleteField(params: any, body: any) {
    const deleteForm = new DeleteForm(new FormRepositoryDatabase(this.databaseConnection));
    await deleteForm.execute(body);
    return { status: 204, output: {} };
  }
}
