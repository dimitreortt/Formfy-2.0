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
const FormDTO_1 = __importDefault(require("../../../domain/dto/FormDTO"));
class FormRepositoryMemory {
    constructor() {
        this.forms = [];
    }
    save(form) {
        return __awaiter(this, void 0, void 0, function* () {
            this.forms.push(form);
            return new FormDTO_1.default(form.name, 1);
        });
    }
    update(formName, newForm) {
        throw new Error('Method not implemented.');
    }
    delete(formId) {
        throw new Error('Method not implemented.');
    }
    deleteFields(formId) {
        throw new Error('Method not implemented.');
    }
    updateField(formId, fieldName, newField) {
        throw new Error('Method not implemented.');
    }
    deleteField(formId, label) {
        throw new Error('Method not implemented.');
    }
}
exports.default = FormRepositoryMemory;
