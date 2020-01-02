import Product from '../model/Product';

class ProductController {
  async store(req, res) {
    const productExists = await Product.findOne({
      where: { description: req.body.description },
    });

    if (productExists) {
      return res.status(400).json({ error: 'Product already exists.' });
    }

    const { id, description, amount, price } = await Product.create(req.body);

    return res.json({ id, description, amount, price });
  }

  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }

  async update(req, res) {
    const { description } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(400).json({ error: 'Product does not exists' });
    }

    if (description !== product.description) {
      const productExists = await Product.findOne({
        where: { description: req.body.description },
      });

      if (productExists) {
        return res.status(400).json({ error: 'Product already exists.' });
      }
    }

    const { id, amount, price } = await product.update(req.body);

    return res.json({ id, description, amount, price });
  }

  async delete(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(400).json({ error: 'Product does not exist' });
    }

    const { id, description, amount, price } = product;

    await product.destroy();

    return res.json({ id, description, amount, price });
  }
}

export default new ProductController();
