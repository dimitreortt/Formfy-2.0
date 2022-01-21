import Form from '../../src/domain/entitites/Form';
import FormField from '../../src/domain/entitites/FormField';
import Registry from '../../src/domain/entitites/Registry';

test('Should create a registry of a form with 2 fields, one short text, and one list selection', () => {
  const listSelectionOptions = ['Brazil', 'England'];
  const fields = [
    new FormField('Short Text', 'Name'),
    new FormField('List Selection', 'Country', listSelectionOptions),
  ];
  const registry = new Registry(fields, ['Dimitre', 'Brazil']);
  expect(registry.values['Name']).toBe('Dimitre');
  expect(registry.values['Country']).toBe('Brazil');
});

test('Should create a registry of a form with 2 fields, one list selection, and one checkbox selection', () => {
  const listSelectionOptions = ['Brazil', 'England'];
  const checkBoxOptions = ['Big', 'Crispy', 'Yellow', 'Melancholic'];
  const fields = [
    new FormField('List Selection', 'Country', listSelectionOptions),
    new FormField('Checkbox', 'Fixtures', checkBoxOptions),
  ];
  const checkBoxInputs = ['Big', 'Yellow'];
  const registry = new Registry(fields, ['Brazil', checkBoxInputs]);
  expect(registry.values['Country']).toBe('Brazil');
  expect(registry.values['Fixtures']).toEqual(checkBoxInputs);
});
