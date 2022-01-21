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
const FormsController_1 = __importDefault(require("../../controller/FormsController"));
class FormsRouter {
    constructor(http, databaseConnection) {
        this.http = http;
        this.databaseConnection = databaseConnection;
        this.configure();
    }
    configure() {
        this.http.on('/form', 'get', (params, body) => __awaiter(this, void 0, void 0, function* () {
            const formsController = new FormsController_1.default(this.databaseConnection);
            return formsController.getForm(params, body);
        }));
        this.http.on('/forms', 'get', (params, body) => __awaiter(this, void 0, void 0, function* () {
            const formsController = new FormsController_1.default(this.databaseConnection);
            return formsController.getForms(params, body);
        }));
        this.http.on('/form', 'post', (params, body) => __awaiter(this, void 0, void 0, function* () {
            const formsController = new FormsController_1.default(this.databaseConnection);
            return formsController.createForm(params, body);
        }));
        this.http.on('/form', 'patch', (params, body) => __awaiter(this, void 0, void 0, function* () {
            const formsController = new FormsController_1.default(this.databaseConnection);
            return formsController.updateForm(params, body);
        }));
        this.http.on('/form', 'delete', (params, body) => __awaiter(this, void 0, void 0, function* () {
            const formsController = new FormsController_1.default(this.databaseConnection);
            return formsController.deleteForm(params, body);
        }));
    }
}
exports.default = FormsRouter;
