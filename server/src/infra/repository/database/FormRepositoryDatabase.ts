import FormRepository from '../../../domain/repository/FormRepository';
import Form from '../../../domain/entitites/Form';
import DatabaseConnection from '../../database/DatabaseConnection';
import FormDTO from '../../../domain/dto/FormDTO';
import FormFieldOptionsFormatter from '../../service/FormFieldOptionsFormatter';
import FormField from '../../../domain/entitites/FormField';
import FormFieldDTO from '../../../domain/dto/FormFieldDTO';

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

    let fields: FormField[] = [];
    for (const field in form.fields) {
      fields.push(form.fields[field]);
    }
    fields.sort((fieldA, fieldB) => {
      if (!fieldB.index) return 1;
      if (!fieldA.index) return -1;
      return fieldA.index - fieldB.index;
    });

    let formFieldsData: FormFieldDTO[] = [];

    for (const label in form.fields) {
      let index = form.fields[label].index;
      if (!index) {
        const count = await this.formFieldsCount(formData.id);
        // console.log(count);
        index = count;
      }
      const [
        formFieldData,
      ] = await this.databaseConnection.query(
        'insert into formfy.form_field (form_id, label, type, options, index) values ($1, $2, $3, $4, $5) returning *;',
        [
          formData.id,
          label,
          form.fields[label].type,
          FormFieldOptionsFormatter.format(form.fields[label].options),
          index,
        ]
      );
      formFieldsData.push(formFieldData);
    }

    return new FormDTO(formData.name, formData.id, formFieldsData);
  }

  async update(formName: string, newForm: Form): Promise<FormDTO> {
    const [
      formData,
    ] = await this.databaseConnection.query(
      'update formfy.form set name = $1 where name = $2 returning *;',
      [newForm.name, formName]
    );
    return formData;
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

  async updateField(formId: number, fieldLabel: string, newField: FormField): Promise<void> {
    await this.databaseConnection.query(
      'update formfy.form_field set (label, type, options, index) = ($1, $2, $3, $4) where form_id = $5 and label = $6;',
      [
        newField.label,
        newField.type,
        FormFieldOptionsFormatter.format(newField.options),
        newField.index,
        formId,
        fieldLabel,
      ]
    );
  }

  async deleteField(formId: number, label: string): Promise<void> {
    await this.databaseConnection.query(
      'delete from formfy.form_field where form_id = $1 and label = $2;',
      [formId, label]
    );
  }

  async formFieldsCount(formId: number) {
    const [
      data,
    ] = await this.databaseConnection.query(
      `select count(form_id) from formfy.form_field where form_id = $1;`,
      [formId]
    );

    return data ? data.count : 0;
  }

  async swapIndexes(formId: number, indexA: number, indexB: number) {
    if (indexA < 0 || indexB < 0) throw new Error('Cannot swap form_field with index less than 0');
    const difference = indexA - indexB;
    console.log(indexA);
    console.log(indexB);
    if (difference !== 1 && difference !== -1)
      throw new Error('form_fields have to have difference of 1 or -1 to be swapped!');
    await this.databaseConnection.query(
      `
    update formfy.form_field
    set index = case index
    when $1 then ($2)
    when $2 then ($1)
    end
    where index in ($1,$2) and form_id = $3;
    `,
      [indexA, indexB, formId]
    );
  }
}
