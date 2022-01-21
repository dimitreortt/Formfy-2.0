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
const FormRepositoryDatabase_1 = __importDefault(require("../repository/database/FormRepositoryDatabase"));
const UpdateField_1 = __importDefault(require("../../application/usecase/UpdateField"));
const UpdateFieldInput_1 = __importDefault(require("../../application/dto/UpdateFieldInput"));
const DeleteField_1 = __importDefault(require("../../application/usecase/DeleteField"));
const DeleteFieldInput_1 = __importDefault(require("../../application/dto/DeleteFieldInput"));
class FormFieldsController {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    updateField(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateField = new UpdateField_1.default(new FormRepositoryDatabase_1.default(this.databaseConnection));
            const updateFieldInput = new UpdateFieldInput_1.default(body.fieldLabel, body.formId, body.newType, body.newLabel, body.newOptions);
            const output = yield updateField.execute(updateFieldInput);
            return { status: 204, output };
        });
    }
    deleteField(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteField = new DeleteField_1.default(new FormRepositoryDatabase_1.default(this.databaseConnection));
            const deleteFieldInput = new DeleteFieldInput_1.default(body.formId, body.fieldLabel);
            yield deleteField.execute(deleteFieldInput);
            return { status: 204, output: {} };
        });
    }
}
exports.default = FormFieldsController;
