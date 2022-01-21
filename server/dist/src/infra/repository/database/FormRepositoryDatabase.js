"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormFieldOptionsFormatter_1 = __importDefault(require("../../service/FormFieldOptionsFormatter"));
class FormRepositoryDatabase {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    save(form) {
        return __awaiter(this, void 0, void 0, function* () {
            const [formData,] = yield this.databaseConnection.query('insert into formfy.form (name) values ($1) returning *;', [form.name]);
            // pesquisar forma de integrar um performance booster tipo o PgArrayFormatter sem quebrar a hierarquia das camadas de DDD
            for (const label in form.fields) {
                yield this.databaseConnection.query('insert into formfy.form_field (form_id, label, type, options) values ($1, $2, $3, $4);', [
                    formData.id,
                    label,
                    form.fields[label].type,
                    FormFieldOptionsFormatter_1.default.format(form.fields[label].options),
                ]);
            }
            return formData;
        });
    }
    update(formName, newForm) {
        return __awaiter(this, void 0, void 0, function* () {
            const [formData,] = yield this.databaseConnection.query('update formfy.form set name = $1 where name = $2 returning *;', [newForm.name, formName]);
            return formData;
        });
    }
    delete(formId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.query('delete from formfy.form where id = $1 returning *;', [
                formId,
            ]);
        });
    }
    deleteFields(formId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.query('delete from formfy.form_field where form_id = $1 returning *;', [formId]);
        });
    }
    updateField(formId, fieldLabel, newField) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.query('update formfy.form_field set (label, type, options) = ($1, $2, $3) where form_id = $4 and label = $5;', [
                newField.label,
                newField.type,
                FormFieldOptionsFormatter_1.default.format(newField.options),
                formId,
                fieldLabel,
            ]);
        });
    }
    deleteField(formId, label) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.query('delete from formfy.form_field where form_id = $1 and label = $2;', [formId, label]);
        });
    }
}
exports.default = FormRepositoryDatabase;
