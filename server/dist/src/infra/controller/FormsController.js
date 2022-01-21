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
const CreateForm_1 = __importDefault(require("../../application/usecase/CreateForm"));
const UpdateForm_1 = __importDefault(require("../../application/usecase/UpdateForm"));
const DeleteForm_1 = __importDefault(require("../../application/usecase/DeleteForm"));
const FormRepositoryDatabase_1 = __importDefault(require("../repository/database/FormRepositoryDatabase"));
const GetForms_1 = __importDefault(require("../../application/query/GetForms"));
const GetForm_1 = __importDefault(require("../../application/query/GetForm"));
const FormDAODatabase_1 = __importDefault(require("../dao/FormDAODatabase"));
const CreateFormInput_1 = __importDefault(require("../../application/dto/CreateFormInput"));
const UpdateFormInput_1 = __importDefault(require("../../application/dto/UpdateFormInput"));
const FormField_1 = __importDefault(require("../../domain/entitites/FormField"));
const GetFormInput_1 = __importDefault(require("../../application/dto/GetFormInput"));
class FormsController {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    createForm(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!body.fields)
                throw new Error('List of form fields cannot be empty');
            const createForm = new CreateForm_1.default(new FormRepositoryDatabase_1.default(this.databaseConnection));
            const fields = [];
            for (const fieldData of body.fields) {
                const formField = new FormField_1.default(fieldData.type, fieldData.label, fieldData.options);
                fields.push(formField);
            }
            const createFormInput = new CreateFormInput_1.default(body.name, fields);
            const output = yield createForm.execute(createFormInput);
            return { status: 201, output };
        });
    }
    getForms(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const getForms = new GetForms_1.default(new FormDAODatabase_1.default(this.databaseConnection));
            const forms = yield getForms.execute();
            return {
                status: 200,
                output: {
                    forms,
                },
            };
        });
    }
    getForm(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const getForm = new GetForm_1.default(new FormDAODatabase_1.default(this.databaseConnection));
            const getFormInput = new GetFormInput_1.default(body.name);
            const output = yield getForm.execute(getFormInput);
            return { status: 200, output };
        });
    }
    updateForm(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateForm = new UpdateForm_1.default(new FormRepositoryDatabase_1.default(this.databaseConnection));
            const updateFormInput = new UpdateFormInput_1.default(body.name, body.newName);
            const output = yield updateForm.execute(updateFormInput);
            return { status: 204, output };
        });
    }
    deleteForm(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteForm = new DeleteForm_1.default(new FormRepositoryDatabase_1.default(this.databaseConnection));
            yield deleteForm.execute(body);
            return { status: 204, output: {} };
        });
    }
}
exports.default = FormsController;
