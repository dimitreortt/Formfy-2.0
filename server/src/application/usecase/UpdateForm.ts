import UpdateFormInput from '../dto/UpdateFormInput';
import FormRepository from '../../domain/repository/FormRepository';
import Form from '../../domain/entitites/Form';
import UpdateFormOutput from '../dto/UpdateFormOutput';

export default class UpdateForm {
  constructor(private formRepository: FormRepository) {}

  async execute(input: UpdateFormInput): Promise<UpdateFormOutput> {
    const newForm = new Form(input.newName);
    const formData = await this.formRepository.update(input.name, newForm);
    return new UpdateFormOutput(formData.name, formData.id);
  }
}
