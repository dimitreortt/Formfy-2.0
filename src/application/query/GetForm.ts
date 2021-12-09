import GetFormOutput from '../dto/GetFormOutput';
import FormDAO from './FormDAO';
import GetFormInput from '../dto/GetFormInput';
import Form from '../../domain/entitites/Form';
import FormField from '../../domain/entitites/FormField';

export default class GetForm {
  constructor(readonly formDAO: FormDAO) {}

  async execute(input: GetFormInput): Promise<GetFormOutput> {
    const formData = await this.formDAO.getForm(input.name);
    const form = new Form(input.name);
    const formFieldsData = await this.formDAO.getFormFields(formData.id);
    for (const field of formFieldsData) {
      form.addField(new FormField(field.type, field.label, field.options));
    }
    return new GetFormOutput(form);
  }
}
