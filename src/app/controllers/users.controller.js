const { User } = require('../models');
const { generateToken } = require('../services/token.service');

class UsersController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
      const token = await generateToken({ userId: user.id, email: user.email });
  
      user.password_hash = undefined;
      return res.status(201).send({ token, data: user });
    } catch (error) {
      if (error.errors) {
        return res.status(400).send({ errors: error.errors });
      }
      next(error);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
  
      user.password_hash = undefined;
      return res.status(201).send({ data: user });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email }});
      if (!user || (user && !user.checkPassword(password))) {
        return res.status(403).send({ message: 'Incorrect email or password.' });
      }

      const token = await generateToken({ userId: user.id, email: user.email });

      user.password_hash = undefined;
      return res.status(201).send({ token, data: user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();
