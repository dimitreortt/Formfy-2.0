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
const CreateFormInput_1 = __importDefault(require("../../../src/application/dto/CreateFormInput"));
const CreateForm_1 = __importDefault(require("../../../src/application/usecase/CreateForm"));
const FormRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/FormRepositoryDatabase"));
const DatabaseConnectionMock_1 = __importDefault(require("../../mocks/DatabaseConnectionMock"));
const FormField_1 = __importDefault(require("../../../src/domain/entitites/FormField"));
const GetForm_1 = __importDefault(require("../../../src/application/query/GetForm"));
const FormDAODatabase_1 = __importDefault(require("../../../src/infra/dao/FormDAODatabase"));
const GetFormInput_1 = __importDefault(require("../../../src/application/dto/GetFormInput"));
const DeleteFieldInput_1 = __importDefault(require("../../../src/application/dto/DeleteFieldInput"));
const DeleteField_1 = __importDefault(require("../../../src/application/usecase/DeleteField"));
let databaseConnection;
let formRepositoryDatabase;
let getForm;
let createForm;
let deleteField;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
    createForm = new CreateForm_1.default(formRepositoryDatabase);
    getForm = new GetForm_1.default(new FormDAODatabase_1.default(databaseConnection));
    deleteField = new DeleteField_1.default(formRepositoryDatabase);
}));
test('Should delete a form field', () => __awaiter(void 0, void 0, void 0, function* () {
    const field = new FormField_1.default('List Selection', 'Color', ['Yellow', 'Green', 'Blue']);
    const createFormInput = new CreateFormInput_1.default('Paint', [field]);
    const createFormOutput = yield createForm.execute(createFormInput);
    const deleteFieldInput = new DeleteFieldInput_1.default(createFormOutput.formId, 'Color');
    yield deleteField.execute(deleteFieldInput);
    const getFormInput = new GetFormInput_1.default('Paint');
    const getFormOutput = yield getForm.execute(getFormInput);
    expect(getFormOutput.formFields.length).toBe(0);
}));
// fazer o caso de formulário não existe no GetFormTest
