"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class ExpressAdapter {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    on(url, method, fn) {
        this.app[method](url, (req, res) => {
            return fn(req.params, req.body)
                .then((result) => {
                res.status(result.status).json(result.output);
            })
                .catch((error) => {
                console.log(error.message);
                res.status(400).json('Error!! ' + error.message);
            });
        });
    }
    listen(port) {
        console.log('App running on port ' + port);
        this.app.listen(port);
    }
    getApp() {
        return this.app;
    }
}
exports.default = ExpressAdapter;
