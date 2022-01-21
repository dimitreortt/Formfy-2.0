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
let databaseConnection;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
}));
test('Should create a form', () => __awaiter(void 0, void 0, void 0, function* () {
    const createFormInput = new CreateFormInput_1.default('Subscription', []);
    const formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
    const createForm = new CreateForm_1.default(formRepositoryDatabase);
    const output = yield createForm.execute(createFormInput);
    expect(output.name).toBe('Subscription');
    expect(typeof output.formId).toBe('number');
}));
