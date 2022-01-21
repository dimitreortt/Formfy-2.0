import FormField from '../../src/domain/entitites/FormField';

test('Should create a form field with type short text', () => {
  const formField = new FormField('Short Text', 'Name');
  expect(formField.type).toBe('Short Text');
  expect(formField.label).toBe('Name');
});

test('Should create a form field with type list selection', () => {
  const formField = new FormField('List Selection', 'Country', ['Brazil', 'England']);
  expect(formField.type).toBe('List Selection');
  expect(formField.label).toBe('Country');
  expect(formField.options).toEqual(['Brazil', 'England']);
});

test('Should create a form field with type checkbox selection', () => {
  const checkBoxOptions = ['Big', 'Crispy', 'Yellow', 'Melancholic'];
  const formField = new FormField('Checkbox', 'Fixtures', checkBoxOptions);
  expect(formField.type).toBe('Checkbox');
  expect(formField.label).toBe('Fixtures');
  expect(formField.options).toEqual(['Big', 'Crispy', 'Yellow', 'Melancholic']);
});

// create all other types -> long text, cpf, cnpj, phoneNumber, date, date and time
