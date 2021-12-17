import GetFormOutput from '../dto/GetFormOutput';
import FormDAO from './FormDAO';
import GetFormInput from '../dto/GetFormInput';
import Form from '../../domain/entitites/Form';
import FormField from '../../domain/entitites/FormField';

export default class GetForm {
  constructor(readonly formDAO: FormDAO) {}

  async execute(input: GetFormInput): Promise<GetFormOutput> {
    const formData = await this.formDAO.getForm(input.name);
    const form = new Form(formData.name); // aqui dá pra mandar um assembly, pq tem que fazer a parte de adicionar os formFields tbm
    const formFields = await this.formDAO.getFormFields(formData.id);
    return new GetFormOutput(form, formFields);
  }
}
