import Form from '../entitites/Form';
import FormDTO from '../../application/dto/FormDTO';

export default interface FormRepository {
  save(form: Form): Promise<FormDTO>;
  // getByName(name: string): Promise<Form>;
}
