"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormsRouter_1 = __importDefault(require("./routers/FormsRouter"));
const FormFieldsRouter_1 = __importDefault(require("./routers/FormFieldsRouter"));
const RegistriesRouter_1 = __importDefault(require("./routers/RegistriesRouter"));
class Router {
    constructor(http, databaseConnection) {
        this.http = http;
        this.databaseConnection = databaseConnection;
        this.configure();
    }
    configure() {
        const formsRouter = new FormsRouter_1.default(this.http, this.databaseConnection);
        const formsFieldsRouter = new FormFieldsRouter_1.default(this.http, this.databaseConnection);
        const registriesRouter = new RegistriesRouter_1.default(this.http, this.databaseConnection);
    }
}
exports.default = Router;
