const { Place } = require('../models');

const vote = async (placeId) => {
  try {
    const place = await Place.findByPk(placeId);
    if (!place) {
      throw new Error('Place not found.');
    }

    await place.vote();
    console.log(`Voted for "${place.name}!"`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { vote };
