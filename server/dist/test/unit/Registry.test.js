"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormField_1 = __importDefault(require("../../src/domain/entitites/FormField"));
const Registry_1 = __importDefault(require("../../src/domain/entitites/Registry"));
test('Should create a registry of a form with 2 fields, one short text, and one list selection', () => {
    const listSelectionOptions = ['Brazil', 'England'];
    const fields = [
        new FormField_1.default('Short Text', 'Name'),
        new FormField_1.default('List Selection', 'Country', listSelectionOptions),
    ];
    const registry = new Registry_1.default(fields, ['Dimitre', 'Brazil']);
    expect(registry.values['Name']).toBe('Dimitre');
    expect(registry.values['Country']).toBe('Brazil');
});
test('Should create a registry of a form with 2 fields, one list selection, and one checkbox selection', () => {
    const listSelectionOptions = ['Brazil', 'England'];
    const checkBoxOptions = ['Big', 'Crispy', 'Yellow', 'Melancholic'];
    const fields = [
        new FormField_1.default('List Selection', 'Country', listSelectionOptions),
        new FormField_1.default('Checkbox', 'Fixtures', checkBoxOptions),
    ];
    const checkBoxInputs = ['Big', 'Yellow'];
    const registry = new Registry_1.default(fields, ['Brazil', checkBoxInputs]);
    expect(registry.values['Country']).toBe('Brazil');
    expect(registry.values['Fixtures']).toEqual(checkBoxInputs);
});
