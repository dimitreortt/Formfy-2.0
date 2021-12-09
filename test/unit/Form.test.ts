import Form from '../../src/domain/entitites/Form';
import FormField from '../../src/domain/entitites/FormField';

test('Should create a form', () => {
  // o nome é a primary key por enquanto
  const form = new Form('Subscription');
  expect(form.name).toBe('Subscription');
});

test('Should create a form with two short text fields', () => {
  const form = new Form('Inscrição');
  form.addField(new FormField('Short Text', 'Name'));
  form.addField(new FormField('Short Text', 'Surname'));
  expect(form.fields['Name'].type).toBe('Short Text');
  expect(form.fields['Surname'].type).toBe('Short Text');
});

test('Should not create 2 fields with the same label', () => {
  const form = new Form('Inscrição');
  form.addField(new FormField('Short Text', 'Name'));
  expect(() => {
    form.addField(new FormField('Short Text', 'Name'));
  }).toThrow(new Error('Label already exists in this form'));
});
