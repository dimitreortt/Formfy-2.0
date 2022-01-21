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
const GetForms_1 = __importDefault(require("../../../src/application/query/GetForms"));
const DatabaseConnectionMock_1 = __importDefault(require("../../mocks/DatabaseConnectionMock"));
const FormDAODatabase_1 = __importDefault(require("../../../src/infra/dao/FormDAODatabase"));
const FormRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/FormRepositoryDatabase"));
let databaseConnection;
let formRepositoryDatabase;
let createForm;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
    createForm = new CreateForm_1.default(formRepositoryDatabase);
}));
test('Should get all forms', () => __awaiter(void 0, void 0, void 0, function* () {
    const createFormInput1 = new CreateFormInput_1.default('Crop Report', []);
    const createFormInput2 = new CreateFormInput_1.default('Product Treatment', []);
    const createFormInput3 = new CreateFormInput_1.default('Library Assessment', []);
    yield createForm.execute(createFormInput1);
    yield createForm.execute(createFormInput2);
    yield createForm.execute(createFormInput3);
    const getForms = new GetForms_1.default(new FormDAODatabase_1.default(databaseConnection));
    const output = yield getForms.execute();
    expect(output.length).toBe(3);
}));
