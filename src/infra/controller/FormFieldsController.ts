import DatabaseConnection from '../database/DatabaseConnection';
import DeleteForm from '../../application/usecase/DeleteForm';
import FormRepositoryDatabase from '../repository/database/FormRepositoryDatabase';
import UpdateField from '../../application/usecase/UpdateField';
import UpdateFieldInput from '../../application/dto/UpdateFieldInput';
import DeleteField from '../../application/usecase/DeleteField';
import DeleteFieldInput from '../../application/dto/DeleteFieldInput';

export default class FormFieldsController {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async updateField(params: any, body: any) {
    const updateField = new UpdateField(new FormRepositoryDatabase(this.databaseConnection));

    const updateFieldInput = new UpdateFieldInput(
      body.fieldLabel,
      body.formId,
      body.newType,
      body.newLabel,
      body.newOptions
    );
    const output = await updateField.execute(updateFieldInput);
    return { status: 204, output };
  }

  async deleteField(params: any, body: any) {
    const deleteField = new DeleteField(new FormRepositoryDatabase(this.databaseConnection));
    const deleteFieldInput = new DeleteFieldInput(body.formId, body.fieldLabel);
    await deleteField.execute(deleteFieldInput);
    return { status: 204, output: {} };
  }
}
