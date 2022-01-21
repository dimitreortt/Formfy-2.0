"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isStringArray = (input) => {
    return Array.isArray(input) && input.every((e) => typeof e === 'string');
};
const isValidDate = (date) => {
    if (date instanceof Date)
        return true;
    if (typeof date !== 'string')
        return false;
    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate))
        return false;
    return true;
};
class RegistryInputsValidator {
    static validate(formFields, inputs) {
        if (formFields.length !== inputs.length)
            throw new Error('Registry values list is invalid');
        let index = 0;
        const fieldValueTypeError = new Error('Invalid field value type in registry creation');
        for (const field of formFields) {
            const input = inputs[index++];
            switch (field.type) {
                case 'Short Text':
                case 'Long Text':
                case 'CNPJ':
                case 'CPF':
                case 'Phone Number':
                case 'List Selection':
                    if (typeof input !== 'string')
                        throw fieldValueTypeError;
                    break;
                case 'Checkbox':
                    if (!isStringArray(input))
                        throw fieldValueTypeError;
                    break;
                case 'Date':
                case 'Date and Time':
                    if (!isValidDate(input))
                        throw fieldValueTypeError;
                    break;
                case 'File':
                    if (!(input instanceof File))
                        throw fieldValueTypeError;
                    break;
            }
        }
    }
}
exports.default = RegistryInputsValidator;
