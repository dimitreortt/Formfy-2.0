import CreateFormInput from '../dto/CreateFormInput';
import CreateFormOutput from '../dto/CreateFormOutput';
import UpdateFormInput from '../dto/UpdateFormInput';
import FormRepository from '../../domain/repository/FormRepository';
import Form from '../../domain/entitites/Form';
import DeleteFormInput from '../dto/DeleteFormInput';

export default class DeleteForm {
  constructor(private formRepository: FormRepository) {}

  async execute(input: DeleteFormInput): Promise<void> {
    await this.formRepository.deleteFields(input.formId);
    await this.formRepository.delete(input.formId);
  }
}
