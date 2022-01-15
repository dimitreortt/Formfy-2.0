import Http from './Http';
import express from 'express';
import cors from 'cors';

export default class ExpressAdapter implements Http {
  private app: any;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async (req: any, res: any) => {
      const result = await fn(req.params, req.body);
      res.json(result);
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
