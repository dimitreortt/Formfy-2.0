import FormRepository from '../../../domain/repository/FormRepository';
import Form from '../../../domain/entitites/Form';
import FormDTO from '../../../application/dto/FormDTO';

export default class FormRepositoryMemory implements FormRepository {
  forms: Form[] = [];

  constructor() {}

  async save(form: Form): Promise<FormDTO> {
    this.forms.push(form);
    return new FormDTO(form.name, 1);
  }
}
