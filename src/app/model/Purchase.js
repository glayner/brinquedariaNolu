import Sequelize, { Model } from 'sequelize';

class Purchase extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}
export default Purchase;
