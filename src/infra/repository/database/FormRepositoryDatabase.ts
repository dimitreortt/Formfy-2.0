import FormRepository from '../../../domain/repository/FormRepository';
import Form from '../../../domain/entitites/Form';
import DatabaseConnection from '../../database/DatabaseConnection';
import FormDTO from '../../../application/dto/FormDTO';
import FormFieldOptionsFormatter from '../../service/FormFieldOptionsFormatter';

export default class FormRepositoryDatabase implements FormRepository {
  constructor(private databaseConnection: DatabaseConnection) {}

  async save(form: Form): Promise<FormDTO> {
    const [
      formData,
    ] = await this.databaseConnection.query(
      'insert into formfy.form (name) values ($1) returning *;',
      [form.name]
    );
    // pesquisar forma de integrar um performance booster tipo o PgArrayFormatter sem quebrar a hierarquia das camadas de DDD
    for (const label in form.fields) {
      await this.databaseConnection.query(
        'insert into formfy.form_field (form_id, label, type, options) values ($1, $2, $3, $4);',
        [
          formData.id,
          label,
          form.fields[label].type,
          FormFieldOptionsFormatter.format(form.fields[label].options),
        ]
      );
    }
    return formData;
  }

  async update(formName: string, newForm: Form): Promise<FormDTO> {
    const [
      formData,
    ] = await this.databaseConnection.query(
      'update formfy.form set name = $1 where name = $2 returning *;',
      [newForm.name, formName]
    );
    return { name: 'oi', id: 1 };
  }

  async delete(formId: number): Promise<void> {
    await this.databaseConnection.query('delete from formfy.form where id = $1 returning *;', [
      formId,
    ]);
  }

  async deleteFields(formId: number): Promise<void> {
    await this.databaseConnection.query(
      'delete from formfy.form_field where form_id = $1 returning *;',
      [formId]
    );
  }
}
