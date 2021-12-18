import FormRepository from '../../domain/repository/FormRepository';
import Form from '../../domain/entitites/Form';
import FormDAO from './FormDAO';
import GetFormOutput from '../dto/GetFormOutput';

export default class GetForms {
  constructor(readonly formDAO: FormDAO) {}

  async execute(): Promise<GetFormOutput[]> {
    const forms = await this.formDAO.getForms();
    const output: GetFormOutput[] = [];
    for (const formData of forms) {
      const fields = await this.formDAO.getFormFields(formData.id);
      output.push(new GetFormOutput(formData, fields));
    }
    return output;
  }
}
