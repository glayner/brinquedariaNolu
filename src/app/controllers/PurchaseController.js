import Purchase from '../model/Purchase';
import Product from '../model/Product';
import User from '../model/User';

import UpdatePurchaseService from '../services/UpdatePurchaseService';

class PurchaseController {
  async store(req, res) {
    const { user_id, product_id, amount } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(400).json({ error: 'Product does not exists' });
    }

    const price = product.price * amount;

    const newAmount = product.amount - amount;
    if (newAmount <= 0) {
      return res.status(400).json({ error: 'Requested quantity out of stock' });
    }

    const purchase = await Purchase.create({
      amount,
      price,
      user_id,
      product_id,
    });

    await product.update({ amount: newAmount });

    return res.json(purchase);
  }

  async index(req, res) {
    const purchases = await Purchase.findAll();

    return res.json(purchases);
  }

  async update(req, res) {
    const { product_id, amount, user_id } = req.body;

    const purchase = await UpdatePurchaseService.run({
      purchase_id: req.params.id,
      product_id,
      amount,
      user_id,
    });

    return res.json(purchase);
  }

  async delete(req, res) {
    const purchase = await Purchase.findByPk(req.params.id);

    if (!purchase) {
      return res.status(400).json({ error: 'Purchase does not exist' });
    }

    const { id, amount, price, user_id, product_id } = purchase;

    await purchase.destroy();

    const product = await Product.findByPk(product_id);
    const newAmount = product.amount + amount;
    await product.update({ amount: newAmount });

    return res.json({ id, amount, price, user_id, product_id });
  }
}

export default new PurchaseController();
