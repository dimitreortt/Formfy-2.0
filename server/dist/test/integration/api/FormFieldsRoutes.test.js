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
const wipeDatabseForms_1 = require("./utils/wipeDatabseForms");
const Router_1 = __importDefault(require("../../../src/infra/http/Router"));
const ExpressAdapter_1 = __importDefault(require("../../../src/infra/http/ExpressAdapter"));
const DatabaseConnectionMock_1 = __importDefault(require("../../mocks/DatabaseConnectionMock"));
const supertest_1 = __importDefault(require("supertest"));
const FormRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/FormRepositoryDatabase"));
const Form_1 = __importDefault(require("../../../src/domain/entitites/Form"));
const FormDAODatabase_1 = __importDefault(require("../../../src/infra/dao/FormDAODatabase"));
const FormField_1 = __importDefault(require("../../../src/domain/entitites/FormField"));
let router;
let databaseConnection;
let formRepository;
let formDAO;
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    formRepository = new FormRepositoryDatabase_1.default(databaseConnection);
    formDAO = new FormDAODatabase_1.default(databaseConnection);
    router = new Router_1.default(new ExpressAdapter_1.default(), databaseConnection);
    app = (0, supertest_1.default)(router.http.getApp());
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, wipeDatabseForms_1.wipeDatabaseForms)(formDAO, formRepository);
}));
test('Should update a form field', () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default('Paint');
    const oldListSelectionOptions = ['Yellow', 'Green', 'Blue'];
    const field = new FormField_1.default('List Selection', 'Color', oldListSelectionOptions);
    form.addField(field);
    const formData = yield formRepository.save(form);
    const newListSelectionOptions = ['Yellow', 'Green', 'Blue', 'Marsala'];
    const body = {
        fieldLabel: 'Color',
        formId: formData.id,
        newType: 'List Selection',
        newLabel: 'Base Color',
        newOptions: newListSelectionOptions,
    };
    const res = yield app.patch('/formField').send(body);
    expect(res.statusCode).toBe(204);
    const formFieldsData = yield formDAO.getFormFields(formData.id);
    expect(formFieldsData[0].label).toBe('Base Color');
    expect(formFieldsData[0].options).toEqual(newListSelectionOptions);
}));
test('Should delete a form field', () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default('Paint');
    const oldListSelectionOptions = ['Yellow', 'Green', 'Blue'];
    const field = new FormField_1.default('List Selection', 'Color', oldListSelectionOptions);
    form.addField(field);
    const formData = yield formRepository.save(form);
    const body = {
        formId: formData.id,
        fieldLabel: 'Color',
    };
    const res = yield app.delete('/formField').send(body);
    expect(res.statusCode).toBe(204);
    const formFieldsData = yield formDAO.getFormFields(formData.id);
    expect(formFieldsData).toHaveLength(0);
}));
