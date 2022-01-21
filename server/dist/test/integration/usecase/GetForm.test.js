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
const CreateForm_1 = __importDefault(require("../../../src/application/usecase/CreateForm"));
const CreateFormInput_1 = __importDefault(require("../../../src/application/dto/CreateFormInput"));
const GetForm_1 = __importDefault(require("../../../src/application/query/GetForm"));
const FormDAODatabase_1 = __importDefault(require("../../../src/infra/dao/FormDAODatabase"));
const GetFormInput_1 = __importDefault(require("../../../src/application/dto/GetFormInput"));
const DatabaseConnectionMock_1 = __importDefault(require("../../mocks/DatabaseConnectionMock"));
const FormRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/FormRepositoryDatabase"));
const FormField_1 = __importDefault(require("../../../src/domain/entitites/FormField"));
let createForm;
let formRepositoryDatabase;
let databaseConnection;
let getForm;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    getForm = new GetForm_1.default(new FormDAODatabase_1.default(databaseConnection));
    formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
    createForm = new CreateForm_1.default(formRepositoryDatabase);
}));
test('Should get a form from name', () => __awaiter(void 0, void 0, void 0, function* () {
    const createFormInput = new CreateFormInput_1.default('Subscription', []);
    const createFormOutput = yield createForm.execute(createFormInput);
    const getFormInput = new GetFormInput_1.default('Subscription');
    const output = yield getForm.execute(getFormInput);
    expect(output.form.name).toBe('Subscription');
    expect(typeof output.form.id).toBe('number');
}));
test('Should get a form with two fields', () => __awaiter(void 0, void 0, void 0, function* () {
    const listSelectionOptions = ['Small', 'Big', 'Medium'];
    const fields = [
        new FormField_1.default('Short Text', 'Number of patches'),
        new FormField_1.default('List Selection', 'Type', ['Small', 'Big', 'Medium']),
    ];
    const createFormInput = new CreateFormInput_1.default('Stock Analysis', fields);
    const createFormOutput = yield createForm.execute(createFormInput);
    const getFormInput = new GetFormInput_1.default('Stock Analysis');
    const output = yield getForm.execute(getFormInput);
    expect(output.formFields).toHaveLength(2);
    expect(output.formFields[0].label).toBe('Number of patches');
    expect(output.formFields[1].label).toBe('Type');
    expect(output.formFields[1].options).toEqual(listSelectionOptions);
}));
