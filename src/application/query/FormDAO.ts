import FormDTO from '../dto/FormDTO';
import FormFieldDTO from '../dto/FormFieldDTO';

export default interface FormDAO {
  getForm(name: string): Promise<FormDTO>;
  getForms(): Promise<FormDTO[]>;
  getFormFields(formId: number): Promise<FormFieldDTO[]>;
}
