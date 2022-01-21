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
const wipeDatabaseRegistries_1 = require("./utils/wipeDatabaseRegistries");
const wipeDatabseForms_1 = require("./utils/wipeDatabseForms");
const ExpressAdapter_1 = __importDefault(require("../../../src/infra/http/ExpressAdapter"));
const Router_1 = __importDefault(require("../../../src/infra/http/Router"));
const FormRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/FormRepositoryDatabase"));
const RegistryRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/RegistryRepositoryDatabase"));
const DatabaseConnectionMock_1 = __importDefault(require("../../mocks/DatabaseConnectionMock"));
const RegistryDAODatabase_1 = __importDefault(require("../../../src/infra/dao/RegistryDAODatabase"));
const Form_1 = __importDefault(require("../../../src/domain/entitites/Form"));
const FormField_1 = __importDefault(require("../../../src/domain/entitites/FormField"));
const supertest_1 = __importDefault(require("supertest"));
const Registry_1 = __importDefault(require("../../../src/domain/entitites/Registry"));
const FormDAODatabase_1 = __importDefault(require("../../../src/infra/dao/FormDAODatabase"));
let router;
let databaseConnection;
let formRepository;
let registryRepository;
let registryDAO;
let formDAO;
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    formRepository = new FormRepositoryDatabase_1.default(databaseConnection);
    registryRepository = new RegistryRepositoryDatabase_1.default(databaseConnection);
    registryDAO = new RegistryDAODatabase_1.default(databaseConnection);
    formDAO = new FormDAODatabase_1.default(databaseConnection);
    router = new Router_1.default(new ExpressAdapter_1.default(), databaseConnection);
    app = (0, supertest_1.default)(router.http.getApp());
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, wipeDatabseForms_1.wipeDatabaseForms)(formDAO, formRepository);
    yield (0, wipeDatabaseRegistries_1.wipeDatabaseRegistries)(formDAO, registryDAO, registryRepository);
}));
test('Should create a registry', () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default('Environment Management Map');
    form.addField(new FormField_1.default('Short Text', 'Area Code'));
    form.addField(new FormField_1.default('Date', 'Last review'));
    const formData = yield formRepository.save(form);
    const areaCode = 'JDAKSDNKJ319928391';
    const lastReviewDate = new Date('2000-06-06');
    const body = {
        formId: formData.id,
        values: [areaCode, lastReviewDate],
    };
    const res = yield app.post('/registry').send(body);
    expect(res.statusCode).toBe(201);
    expect(typeof res.body.registryId).toBe('number');
    const registryFieldsData = yield registryDAO.getRegistryFields(res.body.registryId);
    expect(registryFieldsData).toBeInstanceOf(Array);
    expect(registryFieldsData).toHaveLength(2);
}));
test('Should get the registries', () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default('Stock Analysis');
    const listSelectionOptions = ['Small', 'Big', 'Medium'];
    const fields = [
        new FormField_1.default('Short Text', 'Number of patches'),
        new FormField_1.default('List Selection', 'Type', listSelectionOptions),
    ];
    for (const field of fields) {
        form.addField(field);
    }
    const formData = yield formRepository.save(form);
    const registry1 = new Registry_1.default(fields, ['5', 'Small']);
    const registry2 = new Registry_1.default(fields, ['9', 'Big']);
    yield registryRepository.save(registry1, formData.id);
    yield registryRepository.save(registry2, formData.id);
    const body = { formId: formData.id };
    const res = yield app.get('/registries').send(body);
    expect(res.body.registries).toBeInstanceOf(Array);
    expect(res.body.registries).toHaveLength(2);
    expect(res.body.registries[0].values['Number of patches']).toBe('5');
    expect(res.body.registries[0].values['Type']).toBe('Small');
    expect(res.body.registries[1].values['Number of patches']).toBe('9');
    expect(res.body.registries[1].values['Type']).toBe('Big');
}));
test('Should update a registry', () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default('Stock Analysis');
    const listSelectionOptions = ['Small', 'Big', 'Medium'];
    const fields = [
        new FormField_1.default('Short Text', 'Number of patches'),
        new FormField_1.default('List Selection', 'Type', listSelectionOptions),
    ];
    for (const field of fields) {
        form.addField(field);
    }
    const formData = yield formRepository.save(form);
    const registry = new Registry_1.default(fields, ['5', 'Small']);
    const registryData = yield registryRepository.save(registry, formData.id);
    const changes = [
        { fieldLabel: 'Number of patches', newValue: '39' },
        { fieldLabel: 'Type', newValue: 'Small' },
    ];
    const body = { registryId: registryData.registryId, changes };
    const res = yield app.patch('/registry').send(body);
    expect(res.statusCode).toBe(204);
    const registryFieldsData = yield registryDAO.getRegistryFields(registryData.registryId);
    expect(registryFieldsData).toBeInstanceOf(Array);
    expect(registryFieldsData).toHaveLength(2);
    expect(registryFieldsData[0].value).toBe('39');
    expect(registryFieldsData[1].value).toBe('Small');
}));
test('Should delete a registry', () => __awaiter(void 0, void 0, void 0, function* () {
    const form = new Form_1.default('Stock Analysis');
    const field = new FormField_1.default('Short Text', 'Number of patches');
    form.addField(field);
    const formData = yield formRepository.save(form);
    const registry = new Registry_1.default([field], ['5', 'Small']);
    const registryData = yield registryRepository.save(registry, formData.id);
    const body = { registryId: registryData.registryId };
    const res = yield app.delete('/registry').send(body);
    expect(res.statusCode).toBe(204);
    const registries = yield registryDAO.getRegistries(formData.id);
    expect(registries).toEqual([]);
    const registryFieldsData = yield registryDAO.getRegistryFields(registryData.registryId);
    expect(registryFieldsData).toEqual([]);
}));
