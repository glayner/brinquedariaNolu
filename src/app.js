import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.midwares();
    this.routes();
  }

  midwares() {
    this.server.use(helmet());
    this.server.use(
      cors({
        origin: process.env.FRONT_URL,
      })
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
