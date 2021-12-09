import FormDAO from '../../application/query/FormDAO';
import DatabaseConnection from '../database/DatabaseConnection';
import FormField from '../../domain/entitites/FormField';
import FormDTO from '../../application/dto/FormDTO';
import FormFieldDTO from '../../application/dto/FormFieldDTO';

export default class FormDAODatabase implements FormDAO {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async getForm(name: string): Promise<FormDTO> {
    const formData = await this.databaseConnection.query('select * from form where name = $1', [
      name,
    ]);
    return formData;
  }

  async getFormFields(formId: number): Promise<FormFieldDTO[]> {
    const fields = await this.databaseConnection.query(
      'select * from form_field where form_id = $1',
      [formId]
    );
    return fields;
  }
}
