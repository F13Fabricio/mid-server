const { User } = require('../models');

class UsersController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
  
      user.password_hash = undefined;
      return res.status(201).send({ data: user });
    } catch (error) {
      next(error);
    }
  }

  async show(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
  
      user.password_hash = undefined;
      return res.status(201).send({ data: user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();
