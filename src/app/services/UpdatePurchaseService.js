import Purchase from '../model/Purchase';
import Product from '../model/Product';
import User from '../model/User';

class UpdatePurchaseService {
  async run({ purchase_id, product_id, amount, user_id }) {
    const purchase = await Purchase.findByPk(purchase_id);

    if (!purchase) {
      throw new Error('Purchase does not exist');
    }
    let { price } = purchase;

    const user = await User.findByPk(user_id);

    if (!user) {
      throw new Error('User does not exist');
    }

    if (purchase.product_id !== product_id) {
      const product = await Product.findByPk(product_id);
      if (!product) {
        throw new Error('Product does not exist');
      }

      const newAmount = product.amount - amount;
      if (newAmount <= 0) {
        throw new Error('Requested quantity out of stock');
      }

      await product.update({ amount: newAmount });

      price = product.price * amount;

      const oldProduct = await Product.findByPk(purchase.product_id);
      const chargeback = oldProduct.amount + purchase.amount;
      await oldProduct.update({ amount: chargeback });
    } else if (purchase.amount !== amount) {
      const reajustAmount = amount - purchase.amount;
      const product = await Product.findByPk(purchase.product_id);
      const newAmount = product.amount - reajustAmount;
      await product.update({ amount: newAmount });
    }
    const { id } = purchase.update({
      amount,
      price,
      user_id,
      product_id,
    });

    return { id, amount, price, user_id, product_id };
  }
}

export default new UpdatePurchaseService();
