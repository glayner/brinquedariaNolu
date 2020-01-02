import Sequelize from 'sequelize';

import User from '../app/model/User';
import Product from '../app/model/Product';
import Purchase from '../app/model/Purchase';

import databaseConfig from '../config/database';

const models = [User, Product, Purchase];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
