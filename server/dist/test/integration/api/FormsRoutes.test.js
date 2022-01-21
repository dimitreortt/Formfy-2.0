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
test('Should create a form', () => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        name: 'Seminary',
        fields: [
            {
                type: 'Date',
                label: 'Started At',
            },
            {
                type: 'Checkbox',
                label: 'Topics Studied',
                options: ['Anatomy', 'Stress', 'Faith', 'Creed'],
            },
        ],
    };
    const res = yield app.post('/form').send(body);
    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.formId).toBe('number');
    expect(res.body.name).toBe('Seminary');
    const formData = yield formDAO.getForm('Seminary');
    expect(formData.id).toBe(res.body.formId);
}));
test('Should not create a form', () => __awaiter(void 0, void 0, void 0, function* () {
    const body = { name: 'Seminary' };
    const res = yield app.post('/form').send(body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Error!! List of form fields cannot be empty');
}));
test('Should update a form name', () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default('Subscription');
    const createFormOutput = yield formRepository.save(form);
    const requestBody = {
        name: 'Subscription',
        newName: 'Performance',
    };
    const res = yield app.patch('/form').send(requestBody);
    expect(res.statusCode).toBe(204);
    const formData = yield formDAO.getForm('Performance');
    expect(formData.id).toBe(createFormOutput.id);
}));
test('Should get a form', () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default('Subscription');
    form.addField(new FormField_1.default('Long Text', 'Address'));
    const createFormOutput = yield formRepository.save(form);
    const body = {
        name: 'Subscription',
    };
    const res = yield app.get('/form').send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.form.id).toBe(createFormOutput.id);
    expect(res.body.formFields).toBeInstanceOf(Array);
    expect(res.body.formFields).toHaveLength(1);
    expect(res.body.formFields[0].label).toBe('Address');
}));
test('Should get the forms', () => __awaiter(void 0, void 0, void 0, function* () {
    const form1 = new Form_1.default('Environment Management Map');
    form1.addField(new FormField_1.default('Short Text', 'Area Code'));
    form1.addField(new FormField_1.default('Date', 'Last review'));
    const form2 = new Form_1.default('Land Withdraw');
    form2.addField(new FormField_1.default('Date', 'Monitoring Starting Date'));
    form2.addField(new FormField_1.default('List Selection', 'Land Type', ['Tundra', 'Desert', 'Grasslands']));
    yield formRepository.save(form1);
    yield formRepository.save(form2);
    const res = yield app.get('/forms').send();
    expect(res.body.forms).toHaveLength(2);
    expect(res.body.forms[0].formFields).toHaveLength(2);
    expect(res.body.forms[1].formFields).toHaveLength(2);
}));
test('Should delete form', () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default('Land Withdraw');
    form.addField(new FormField_1.default('Date', 'Monitoring Starting Date'));
    form.addField(new FormField_1.default('List Selection', 'Land Type', ['Tundra', 'Desert', 'Grasslands']));
    const formData1 = yield formRepository.save(form);
    const body = {
        formId: formData1.id,
    };
    const res = yield app.delete('/form').send(body);
    expect(res.statusCode).toEqual(204);
    const formData2 = yield formDAO.getForm('Land Withdraw');
    const formFieldsData = yield formDAO.getFormFields(formData1.id);
    expect(formData2).toBeUndefined();
    expect(formFieldsData).toEqual([]);
}));
