import FormDAO from '../../application/query/FormDAO';
import DatabaseConnection from '../database/DatabaseConnection';
import FormField from '../../domain/entitites/FormField';
import FormDTO from '../../domain/dto/FormDTO';
import FormFieldDTO from '../../application/dto/FormFieldDTO';
import FormFieldOptionsParser from '../service/FormFieldOptionsParser';

export default class FormDAODatabase implements FormDAO {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async getForm(name: string): Promise<FormDTO> {
    const [
      formData,
    ] = await this.databaseConnection.query('select * from formfy.form where name = $1', [name]);
    return formData;
  }

  async getForms(): Promise<FormDTO[]> {
    return await this.databaseConnection.query('select * from formfy.form');
  }

  async getFormFields(formId: number): Promise<FormFieldDTO[]> {
    const fields = await this.databaseConnection.query(
      'select * from formfy.form_field where form_id = $1',
      [formId]
    );
    const parsedFields = fields.map((field: any) => {
      return { ...field, options: FormFieldOptionsParser.parse(field.options) };
    });

    return parsedFields;
  }
}
