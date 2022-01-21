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
const DeleteFormInput_1 = __importDefault(require("../../../src/application/dto/DeleteFormInput"));
const DeleteForm_1 = __importDefault(require("../../../src/application/usecase/DeleteForm"));
let databaseConnection;
let formRepositoryDatabase;
let getForm;
let formId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
    const createForm = new CreateForm_1.default(formRepositoryDatabase);
    const field = new FormField_1.default('Short Text', 'Name');
    const createFormInput = new CreateFormInput_1.default('Subscription', [field]);
    const formData = yield createForm.execute(createFormInput);
    formId = formData.formId;
    getForm = new GetForm_1.default(new FormDAODatabase_1.default(databaseConnection));
}));
test('Should delete a form', () => __awaiter(void 0, void 0, void 0, function* () {
    const deleteFormInput = new DeleteFormInput_1.default(formId);
    const deleteForm = new DeleteForm_1.default(formRepositoryDatabase);
    yield deleteForm.execute(deleteFormInput);
    const getFormInput = new GetFormInput_1.default('Subscription');
    yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
        yield getForm.execute(getFormInput);
    })).rejects.toThrow('Form does not exist');
}));
// fazer o caso de formulário não existe no GetFormTest
