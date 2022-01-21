"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __importDefault(require("../../src/domain/entitites/Form"));
const FormField_1 = __importDefault(require("../../src/domain/entitites/FormField"));
test('Should create a form', () => {
    // o nome é a primary key por enquanto
    const form = new Form_1.default('Subscription');
    expect(form.name).toBe('Subscription');
});
test('Should create a form with two short text fields', () => {
    const form = new Form_1.default('Inscrição');
    form.addField(new FormField_1.default('Short Text', 'Name'));
    form.addField(new FormField_1.default('Short Text', 'Surname'));
    expect(form.fields['Name'].type).toBe('Short Text');
    expect(form.fields['Surname'].type).toBe('Short Text');
});
test('Should not create 2 fields with the same label', () => {
    const form = new Form_1.default('Inscrição');
    form.addField(new FormField_1.default('Short Text', 'Name'));
    expect(() => {
        form.addField(new FormField_1.default('Short Text', 'Name'));
    }).toThrow(new Error('Label already exists in this form'));
});
