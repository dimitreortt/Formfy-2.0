import FormRepository from '../../../domain/repository/FormRepository';
import Form from '../../../domain/entitites/Form';

export default class FormRepositoryMemory implements FormRepository {
  forms: Form[] = [];

  constructor() {}

  async save(form: Form): Promise<void> {
    this.forms.push(form);
  }
}
