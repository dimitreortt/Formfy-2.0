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
const DatabaseConnectionMock_1 = __importDefault(require("../mocks/DatabaseConnectionMock"));
const RegistryRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/RegistryRepositoryDatabase"));
const Registry_1 = __importDefault(require("../../src/domain/entitites/Registry"));
const FormField_1 = __importDefault(require("../../src/domain/entitites/FormField"));
let databaseConnection;
let registryRepositoryDatabase;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    registryRepositoryDatabase = new RegistryRepositoryDatabase_1.default(databaseConnection);
}));
test('Should save a registry', () => __awaiter(void 0, void 0, void 0, function* () {
    const FORM_ID = 1;
    const listSelectionOptions = ['Brazil', 'England'];
    const checkBoxOptions = ['Big', 'Crispy', 'Yellow', 'Melancholic'];
    const fields = [
        new FormField_1.default('List Selection', 'Country', listSelectionOptions),
        new FormField_1.default('Checkbox', 'Fixtures', checkBoxOptions),
    ];
    const checkBoxInputs = ['Big', 'Yellow'];
    const registry = new Registry_1.default(fields, ['Brazil', checkBoxInputs]);
    yield registryRepositoryDatabase.save(registry, FORM_ID);
    const registries = yield databaseConnection.query('select * from formfy.registry;');
    expect(registries).toHaveLength(1);
    const [registryData] = registries;
    expect(registryData.form_id).toBe(FORM_ID);
    const registryFields = yield databaseConnection.query('select * from formfy.registry_field where registry_id = $1;', [registryData.id]);
    expect(registryFields).toHaveLength(2);
    expect(registryFields[0].label).toBe('Country');
    expect(registryFields[0].value).toBe('Brazil');
    expect(registryFields[1].label).toBe('Fixtures');
    expect(registryFields[1].value).toBe('{Big,Yellow}');
}));
test('Should update a registry field', () => __awaiter(void 0, void 0, void 0, function* () {
    const REGISTRY_ID = 101;
    const oldSerialCode = '0101DPÇLPÇ1P1L';
    yield databaseConnection.query('insert into formfy.registry_field (registry_id, label, value) values ($1, $2, $3);', [REGISTRY_ID, 'Serial Code', oldSerialCode]);
    const newSerialCode = '6743682AHISUDA';
    yield registryRepositoryDatabase.updateField(REGISTRY_ID, 'Serial Code', newSerialCode);
    const registryFields = yield databaseConnection.query('select * from formfy.registry_field where registry_id = $1;', [REGISTRY_ID]);
    expect(registryFields).toHaveLength(1);
    expect(registryFields[0].label).toEqual('Serial Code');
    expect(registryFields[0].value).toEqual(newSerialCode);
}));
