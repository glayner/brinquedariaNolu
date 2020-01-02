import User from '../model/User';
import Purchase from '../model/Purchase';
import Product from '../model/Product';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { name: req.body.name } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name } = await User.create(req.body);

    return res.json({ id, name });
  }

  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async update(req, res) {
    const { name } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    if (name !== user.name) {
      const userExists = await User.findOne({ where: { name: req.body.name } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    await user.update(req.body);

    return res.json({ id: req.params.id, name });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const { id, name } = user;

    await user.destroy();

    return res.json({ id, name });
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const purchase = await Purchase.findAll({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['description', 'price'],
        },
      ],
    });

    if (!purchase) {
      return res.status(400).json({ error: 'Purchase does not exist' });
    }

    return res.json({ user, purchase });
  }
}

export default new UserController();
