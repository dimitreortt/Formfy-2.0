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
const RegistriesController_1 = __importDefault(require("../../controller/RegistriesController"));
class Router {
    constructor(http, databaseConnection) {
        this.http = http;
        this.databaseConnection = databaseConnection;
        this.configure();
    }
    configure() {
        this.http.on('/registries', 'get', (params, body) => __awaiter(this, void 0, void 0, function* () {
            const registriesController = new RegistriesController_1.default(this.databaseConnection);
            return registriesController.getRegistries(params, body);
        }));
        this.http.on('/registry', 'post', (params, body) => __awaiter(this, void 0, void 0, function* () {
            const registriesController = new RegistriesController_1.default(this.databaseConnection);
            return registriesController.createRegistry(params, body);
        }));
        this.http.on('/registry', 'patch', (params, body) => __awaiter(this, void 0, void 0, function* () {
            const registriesController = new RegistriesController_1.default(this.databaseConnection);
            return registriesController.updateRegistry(params, body);
        }));
        this.http.on('/registry', 'delete', (params, body) => __awaiter(this, void 0, void 0, function* () {
            const registriesController = new RegistriesController_1.default(this.databaseConnection);
            return registriesController.deleteRegistry(params, body);
        }));
    }
}
exports.default = Router;
