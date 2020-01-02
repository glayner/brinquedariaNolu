import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        amount: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Product;
