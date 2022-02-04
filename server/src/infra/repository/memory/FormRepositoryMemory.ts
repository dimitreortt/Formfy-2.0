import FormRepository from '../../../domain/repository/FormRepository';
import Form from '../../../domain/entitites/Form';
import FormDTO from '../../../domain/dto/FormDTO';

export default class FormRepositoryMemory implements FormRepository {
  formFieldsCount(formId: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
  swapIndexes(formId: number, index: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  forms: Form[] = [];

  constructor() {}

  async save(form: Form): Promise<FormDTO> {
    this.forms.push(form);
    return new FormDTO(form.name, 1, []);
  }

  update(formName: string, newForm: Form): Promise<FormDTO> {
    throw new Error('Method not implemented.');
  }

  delete(formId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteFields(formId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateField(
    formId: number,
    fieldName: string,
    newField: import('../../../domain/entitites/FormField').default
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteField(formId: number, label: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
