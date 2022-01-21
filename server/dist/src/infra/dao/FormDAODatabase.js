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
const FormFieldOptionsParser_1 = __importDefault(require("../service/FormFieldOptionsParser"));
class FormDAODatabase {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    getForm(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [formData,] = yield this.databaseConnection.query('select * from formfy.form where name = $1', [name]);
            return formData;
        });
    }
    getForms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.databaseConnection.query('select * from formfy.form');
        });
    }
    getFormFields(formId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = yield this.databaseConnection.query('select * from formfy.form_field where form_id = $1', [formId]);
            const parsedFields = fields.map((field) => {
                return Object.assign(Object.assign({}, field), { options: FormFieldOptionsParser_1.default.parse(field.options) });
            });
            return parsedFields;
        });
    }
}
exports.default = FormDAODatabase;
