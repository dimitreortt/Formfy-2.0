import Form from '../../src/domain/entitites/Form';
import FormField from '../../src/domain/entitites/FormField';
import Registry from '../../src/domain/entitites/Registry';

test('Should create a registry of a form with 2 fields, one short text, and one list selection', () => {
  const form = new Form('Subscription');
  form.addField(new FormField('Short Text', 'Name'));
  const listSelectionOptions = ['Brazil', 'England'];
  form.addField(new FormField('List Selection', 'Country', listSelectionOptions));
  const registry = new Registry(form, ['Dimitre', 'Brazil']);
  expect(registry.values['Name']).toBe('Dimitre');
  expect(registry.values['Country']).toBe('Brazil');
});

test('Should create a registry of a form with 2 fields, one list selection, and one checkbox selection', () => {
  const form = new Form('Subscription');
  const listSelectionOptions = ['Brazil', 'England'];
  form.addField(new FormField('List Selection', 'Country', listSelectionOptions));
  const checkBoxOptions = ['Big', 'Crispy', 'Yellow', 'Melancholic'];
  form.addField(new FormField('Checkbox', 'Fixtures', checkBoxOptions));
  const checkBoxInputs = ['Big', 'Yellow'];
  const registry = new Registry(form, ['Brazil', checkBoxInputs]);
  expect(registry.values['Country']).toBe('Brazil');
  expect(registry.values['Fixtures']).toEqual(checkBoxInputs);
});
