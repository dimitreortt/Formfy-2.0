import Http from "./Http";
import express, { Application } from "express";
import cors from "cors";

export default class ExpressAdapter implements Http {
  private app: any;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, (req: any, res: any) => {
      return fn(req.params, req.body)
        .then((result: any) => {
          res.status(result.status).json(result.output);
        })
        .catch((error: any) => {
          console.log(error.message);
          res.status(400).json({ message: "Error!! " + error.message });
        });
    });
  }

  listen(port: number): void {
    console.log("App running on port " + port);
    this.app.listen(port);
  }

  getApp() {
    return this.app;
  }
}
