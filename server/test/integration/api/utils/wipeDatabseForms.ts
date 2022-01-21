import FormDAO from '../../../../src/application/query/FormDAO';
import FormRepository from '../../../../src/domain/repository/FormRepository';

export const wipeDatabaseForms = async (formDAO: FormDAO, formRepository: FormRepository) => {
  const forms = await formDAO.getForms();
  for (const form of forms) {
    await formRepository.deleteFields(form.id);
    await formRepository.delete(form.id);
  }
};
