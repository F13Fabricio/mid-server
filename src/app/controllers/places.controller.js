const { User, Place } = require('../models');

class PlacesController {
  async index(req, res, next) {
    try {
      const places = await Place.findAll();

      return res.status(200).send({ count: places.length, data: places });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const UserId = req.params.userId;
      const user = await User.findByPk(UserId);
      if (!user) {
        return res.status(400).send({ message: 'User not found.' });
      }

      const name = req.body.name;
      const { location: imageUrl = '' } = req.file;
      const place = await Place.create({
        name, UserId, imageUrl, numberOfVotes: 0
      });

      return res.status(201).send({ data: place });
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const id = req.params.placeId;
      const place = await Place.findByPk(id);
      if (!place) {
        return res.status(404).send({ message: 'Place not foud.' });
      }

      return res.status(200).send({ data: place });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PlacesController();
