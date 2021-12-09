import Form from '../entitites/Form';

export default interface FormRepository {
  save(form: Form): Promise<void>;
  // getByName(name: string): Promise<Form>;
}
